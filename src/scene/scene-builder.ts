import type { LayoutModel, LayoutNode } from '../model/layout-model.js';
import type {
  Arrow,
  Rectangle,
  Scene,
  ScenePrimitive,
  Text,
} from '../model/scene-graph.js';

const CORNER_RADIUS = 12;

function findNode(
  nodesById: ReadonlyMap<string, LayoutNode>,
  nodeId: string,
): LayoutNode {
  const node = nodesById.get(nodeId);

  if (node === undefined) {
    throw new Error(`Layout edge references unknown node "${nodeId}".`);
  }

  return node;
}

function createArrow(source: LayoutNode, target: LayoutNode): Arrow {
  return {
    kind: 'arrow',
    startX: source.x + source.width / 2,
    startY: source.y + source.height,
    endX: target.x + target.width / 2,
    endY: target.y,
  };
}

function createNodePrimitives(node: LayoutNode): readonly [Rectangle, Text] {
  return [
    {
      kind: 'rectangle',
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      cornerRadius: CORNER_RADIUS,
    },
    {
      kind: 'text',
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
      value: node.label,
    },
  ];
}

export function buildScene(layout: LayoutModel): Scene {
  const nodesById = new Map(layout.nodes.map((node) => [node.id, node]));
  const arrows = layout.edges.map((edge) =>
    createArrow(
      findNode(nodesById, edge.sourceId),
      findNode(nodesById, edge.targetId),
    ),
  );
  const nodePrimitives: readonly ScenePrimitive[] =
    layout.nodes.flatMap(createNodePrimitives);

  return {
    width: layout.width,
    height: layout.height,
    primitives: [...arrows, ...nodePrimitives],
  };
}
