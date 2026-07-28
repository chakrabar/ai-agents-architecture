import type {
  LayoutGroup,
  LayoutModel,
  LayoutNode,
  LayoutStage,
} from '../model/layout-model.js';
import type {
  Arrow,
  Rectangle,
  Scene,
  ScenePrimitive,
  Text,
} from '../model/scene-graph.js';

const PRIMARY_CORNER_RADIUS = 16;
const SECONDARY_CORNER_RADIUS = 12;

function findStage(
  stagesById: ReadonlyMap<string, LayoutStage>,
  stageId: string,
): LayoutStage {
  const stage = stagesById.get(stageId);

  if (stage === undefined) {
    throw new Error(`Layout edge references unknown stage "${stageId}".`);
  }

  return stage;
}

function createArrow(source: LayoutStage, target: LayoutStage): Arrow {
  return {
    kind: 'arrow',
    startX: source.x + source.width / 2,
    startY: source.y + source.height,
    endX: target.x + target.width / 2,
    endY: target.y,
  };
}

function createNodePrimitives(
  node: LayoutNode,
  cornerRadius: number,
  fontWeight: Text['fontWeight'],
): readonly [Rectangle, Text] {
  return [
    {
      kind: 'rectangle',
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      cornerRadius,
    },
    {
      kind: 'text',
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
      value: node.label,
      fontSize: node.fontSize,
      fontWeight,
    },
  ];
}

function createGroupPrimitives(group: LayoutGroup): readonly ScenePrimitive[] {
  return [
    {
      kind: 'rectangle',
      x: group.x,
      y: group.y,
      width: group.width,
      height: group.height,
      cornerRadius: PRIMARY_CORNER_RADIUS,
    },
    {
      kind: 'text',
      x: group.titleX,
      y: group.titleY,
      value: group.title,
      fontSize: group.titleFontSize,
      fontWeight: 'bold',
    },
    ...group.children.flatMap((child) =>
      createNodePrimitives(child, SECONDARY_CORNER_RADIUS, 'normal'),
    ),
  ];
}

function createStagePrimitives(stage: LayoutStage): readonly ScenePrimitive[] {
  return stage.kind === 'group'
    ? createGroupPrimitives(stage)
    : createNodePrimitives(stage, PRIMARY_CORNER_RADIUS, 'bold');
}

export function buildScene(layout: LayoutModel): Scene {
  const stagesById = new Map(layout.stages.map((stage) => [stage.id, stage]));
  const arrows = layout.edges.map((edge) =>
    createArrow(
      findStage(stagesById, edge.sourceId),
      findStage(stagesById, edge.targetId),
    ),
  );
  const sectionTitle: Text = {
    kind: 'text',
    x: layout.sectionTitle.x,
    y: layout.sectionTitle.y,
    value: layout.sectionTitle.text,
    fontSize: layout.sectionTitle.fontSize,
    fontWeight: 'bold',
  };
  const stagePrimitives: readonly ScenePrimitive[] = layout.stages.flatMap(
    createStagePrimitives,
  );

  return {
    width: layout.width,
    height: layout.height,
    primitives: [...arrows, sectionTitle, ...stagePrimitives],
  };
}
