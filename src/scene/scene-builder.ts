import type {
  LayoutGroup,
  LayoutModel,
  LayoutNode,
  LayoutStage,
} from '../model/layout-model.js';
import type {
  Arrow,
  Rectangle,
  RectangleRole,
  Scene,
  ScenePrimitive,
  Text,
  TextRole,
} from '../model/scene-graph.js';
import { lightTheme, type VisualTheme } from './visual-theme.js';

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

function createArrow(
  source: LayoutStage,
  target: LayoutStage,
  theme: VisualTheme,
): Arrow {
  return {
    kind: 'arrow',
    startX: source.x + source.width / 2,
    startY: source.y + source.height,
    endX: target.x + target.width / 2,
    endY: target.y,
    ...theme.arrow,
  };
}

function createNodePrimitives(
  node: LayoutNode,
  rectangleRole: RectangleRole,
  textRole: TextRole,
  theme: VisualTheme,
): readonly [Rectangle, Text] {
  const rectangleStyle = theme.rectangles[rectangleRole];
  const textStyle = theme.text[textRole];

  return [
    {
      kind: 'rectangle',
      role: rectangleRole,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      ...rectangleStyle,
    },
    {
      kind: 'text',
      role: textRole,
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
      value: node.label,
      ...textStyle,
    },
  ];
}

function createGroupPrimitives(
  group: LayoutGroup,
  theme: VisualTheme,
): readonly ScenePrimitive[] {
  return [
    {
      kind: 'rectangle',
      role: 'container',
      x: group.x,
      y: group.y,
      width: group.width,
      height: group.height,
      ...theme.rectangles.container,
    },
    {
      kind: 'text',
      role: 'container-title',
      x: group.titleX,
      y: group.titleY,
      value: group.title,
      ...theme.text['container-title'],
    },
    ...group.children.flatMap((child) =>
      createNodePrimitives(child, 'secondary-node', 'secondary-label', theme),
    ),
  ];
}

function createStagePrimitives(
  stage: LayoutStage,
  theme: VisualTheme,
): readonly ScenePrimitive[] {
  return stage.kind === 'group'
    ? createGroupPrimitives(stage, theme)
    : createNodePrimitives(stage, 'primary-node', 'primary-label', theme);
}

export function buildScene(
  layout: LayoutModel,
  theme: VisualTheme = lightTheme,
): Scene {
  const stagesById = new Map(layout.stages.map((stage) => [stage.id, stage]));
  const arrows = layout.edges.map((edge) =>
    createArrow(
      findStage(stagesById, edge.sourceId),
      findStage(stagesById, edge.targetId),
      theme,
    ),
  );
  const sectionTitle: Text = {
    kind: 'text',
    role: 'section-title',
    x: layout.sectionTitle.x,
    y: layout.sectionTitle.y,
    value: layout.sectionTitle.text,
    ...theme.text['section-title'],
  };
  const stagePrimitives: readonly ScenePrimitive[] = layout.stages.flatMap(
    (stage) => createStagePrimitives(stage, theme),
  );

  return {
    width: layout.width,
    height: layout.height,
    backgroundColor: theme.canvas.fill,
    primitives: [...arrows, sectionTitle, ...stagePrimitives],
  };
}
