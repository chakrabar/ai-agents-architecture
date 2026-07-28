export { generateSvg } from './generate-svg.js';
export {
  SimpleLayoutEngine,
  createSimpleLayout,
} from './layout/simple-layout-engine.js';
export type { LayoutEngine } from './layout/layout-engine.interface.js';
export {
  defaultLayoutMetrics,
  type LayoutMetrics,
  type SpacingScale,
  type TypographyScale,
} from './layout/layout-metrics.js';
export type {
  ArchitectureEdge,
  ArchitectureModel,
  ArchitectureNode,
} from './model/architecture-model.js';
export type {
  LayoutEdge,
  LayoutGroup,
  LayoutModel,
  LayoutNode,
  LayoutSectionTitle,
  LayoutStage,
} from './model/layout-model.js';
export type {
  Arrow,
  Rectangle,
  Scene,
  ScenePrimitive,
  Text,
} from './model/scene-graph.js';
export { SvgRenderer, renderSvg } from './renderer/svg-renderer.js';
export type { Renderer } from './renderer/renderer.interface.js';
export { buildScene } from './scene/scene-builder.js';
