import type { LayoutEngine } from './layout-engine.interface.js';
import type { ArchitectureModel } from '../model/architecture-model.js';
import type { LayoutModel } from '../model/layout-model.js';

const NODE_WIDTH = 240;
const NODE_HEIGHT = 64;
const VERTICAL_SPACING = 64;
const CANVAS_PADDING = 32;

export function createSimpleLayout(
  architecture: ArchitectureModel,
): LayoutModel {
  const nodes = architecture.nodes.map((node, index) => ({
    id: node.id,
    label: node.label,
    x: CANVAS_PADDING,
    y: CANVAS_PADDING + index * (NODE_HEIGHT + VERTICAL_SPACING),
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  }));

  const contentHeight =
    nodes.length === 0
      ? 0
      : nodes.length * NODE_HEIGHT + (nodes.length - 1) * VERTICAL_SPACING;

  return {
    width: NODE_WIDTH + 2 * CANVAS_PADDING,
    height: contentHeight + 2 * CANVAS_PADDING,
    nodes,
    edges: architecture.edges.map((edge) => ({ ...edge })),
  };
}

export const SimpleLayoutEngine = Object.freeze({
  layout: createSimpleLayout,
}) satisfies LayoutEngine<ArchitectureModel, LayoutModel>;
