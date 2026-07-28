import type { LayoutEngine } from './layout-engine.interface.js';
import { defaultLayoutMetrics, type LayoutMetrics } from './layout-metrics.js';
import type {
  ArchitectureModel,
  ArchitectureNode,
} from '../model/architecture-model.js';
import type {
  LayoutEdge,
  LayoutGroup,
  LayoutModel,
  LayoutNode,
  LayoutStage,
} from '../model/layout-model.js';

interface LogicalNodeStage {
  readonly kind: 'node';
  readonly node: ArchitectureNode;
}

interface LogicalGroupStage {
  readonly kind: 'group';
  readonly title: string;
  readonly nodes: ArchitectureNode[];
}

type LogicalStage = LogicalNodeStage | LogicalGroupStage;

interface MeasuredNodeStage extends LogicalNodeStage {
  readonly height: number;
}

interface MeasuredGroupStage extends LogicalGroupStage {
  readonly id: string;
  readonly intrinsicWidth: number;
  readonly childStripWidth: number;
  readonly height: number;
}

type MeasuredStage = MeasuredNodeStage | MeasuredGroupStage;

function createGroupId(group: string): string {
  return `group:${group}`;
}

function collectLogicalStages(
  nodes: readonly ArchitectureNode[],
): readonly LogicalStage[] {
  const stages: LogicalStage[] = [];
  const groupIndexes = new Map<string, number>();

  for (const node of nodes) {
    if (node.group === undefined) {
      stages.push({ kind: 'node', node });
      continue;
    }

    const existingIndex = groupIndexes.get(node.group);

    if (existingIndex === undefined) {
      groupIndexes.set(node.group, stages.length);
      stages.push({ kind: 'group', title: node.group, nodes: [node] });
      continue;
    }

    const existingStage = stages[existingIndex];

    if (existingStage?.kind !== 'group') {
      throw new Error(`Unable to collect architecture group "${node.group}".`);
    }

    existingStage.nodes.push(node);
  }

  return stages;
}

function measureStage(
  stage: LogicalStage,
  metrics: LayoutMetrics,
): MeasuredStage {
  if (stage.kind === 'node') {
    return {
      ...stage,
      height: metrics.primaryNode.height,
    };
  }

  const childStripWidth =
    stage.nodes.length * metrics.secondaryNode.width +
    Math.max(0, stage.nodes.length - 1) * metrics.group.childSpacing;

  return {
    ...stage,
    id: createGroupId(stage.title),
    intrinsicWidth: childStripWidth + 2 * metrics.group.containerPadding,
    childStripWidth,
    height:
      metrics.group.titleAreaHeight +
      metrics.secondaryNode.height +
      metrics.group.bottomPadding,
  };
}

function positionNodeStage(
  stage: MeasuredNodeStage,
  canvasWidth: number,
  compositionWidth: number,
  y: number,
  metrics: LayoutMetrics,
): LayoutNode {
  const width = Math.round(compositionWidth * metrics.primaryNode.widthRatio);

  return {
    kind: 'node',
    id: stage.node.id,
    label: stage.node.label,
    x: (canvasWidth - width) / 2,
    y,
    width,
    height: stage.height,
    fontSize: metrics.typography.primaryNode,
  };
}

function positionGroupStage(
  stage: MeasuredGroupStage,
  canvasWidth: number,
  compositionWidth: number,
  y: number,
  metrics: LayoutMetrics,
): LayoutGroup {
  const x = (canvasWidth - compositionWidth) / 2;
  const childStartX = x + (compositionWidth - stage.childStripWidth) / 2;
  const childY = y + metrics.group.titleAreaHeight;

  return {
    kind: 'group',
    id: stage.id,
    title: stage.title,
    x,
    y,
    width: compositionWidth,
    height: stage.height,
    titleX: x + compositionWidth / 2,
    titleY: y + metrics.group.titleAreaHeight / 2,
    titleFontSize: metrics.typography.groupTitle,
    children: stage.nodes.map((node, index) => ({
      kind: 'node',
      id: node.id,
      label: node.label,
      x:
        childStartX +
        index * (metrics.secondaryNode.width + metrics.group.childSpacing),
      y: childY,
      width: metrics.secondaryNode.width,
      height: metrics.secondaryNode.height,
      fontSize: metrics.typography.secondaryNode,
    })),
  };
}

function stageIdForNode(
  nodeId: string,
  stages: readonly LayoutStage[],
): string {
  for (const stage of stages) {
    if (stage.kind === 'node' && stage.id === nodeId) {
      return stage.id;
    }

    if (
      stage.kind === 'group' &&
      stage.children.some((child) => child.id === nodeId)
    ) {
      return stage.id;
    }
  }

  throw new Error(`Architecture edge references unknown node "${nodeId}".`);
}

function createLayoutEdges(
  architecture: ArchitectureModel,
  stages: readonly LayoutStage[],
): readonly LayoutEdge[] {
  const edges: LayoutEdge[] = [];
  const seenEdges = new Set<string>();

  for (const edge of architecture.edges) {
    const sourceId = stageIdForNode(edge.sourceId, stages);
    const targetId = stageIdForNode(edge.targetId, stages);

    if (sourceId === targetId) {
      continue;
    }

    const edgeKey = `${sourceId}\u0000${targetId}`;

    if (!seenEdges.has(edgeKey)) {
      seenEdges.add(edgeKey);
      edges.push({ sourceId, targetId });
    }
  }

  return edges;
}

export function createSimpleLayout(
  architecture: ArchitectureModel,
  metrics: LayoutMetrics = defaultLayoutMetrics,
): LayoutModel {
  const measuredStages = collectLogicalStages(architecture.nodes).map((stage) =>
    measureStage(stage, metrics),
  );
  const compositionWidth = Math.max(
    metrics.composition.minimumWidth,
    ...measuredStages
      .filter((stage): stage is MeasuredGroupStage => stage.kind === 'group')
      .map((stage) => stage.intrinsicWidth),
  );
  const width = compositionWidth + 2 * metrics.composition.outerMargin;
  let nextY =
    metrics.composition.verticalPadding +
    metrics.composition.sectionTitleHeight +
    metrics.composition.sectionTitleSpacing;
  const stages = measuredStages.map((stage): LayoutStage => {
    const positionedStage =
      stage.kind === 'node'
        ? positionNodeStage(stage, width, compositionWidth, nextY, metrics)
        : positionGroupStage(stage, width, compositionWidth, nextY, metrics);

    nextY += stage.height + metrics.composition.verticalRhythm;

    return positionedStage;
  });
  const contentBottom =
    stages.length === 0
      ? metrics.composition.verticalPadding +
        metrics.composition.sectionTitleHeight
      : nextY - metrics.composition.verticalRhythm;

  return {
    width,
    height: contentBottom + metrics.composition.verticalPadding,
    sectionTitle: {
      text: architecture.name,
      x: width / 2,
      y:
        metrics.composition.verticalPadding +
        metrics.composition.sectionTitleHeight / 2,
      fontSize: metrics.typography.sectionTitle,
    },
    stages,
    edges: createLayoutEdges(architecture, stages),
  };
}

export const SimpleLayoutEngine = Object.freeze({
  layout: createSimpleLayout,
}) satisfies LayoutEngine<ArchitectureModel, LayoutModel>;
