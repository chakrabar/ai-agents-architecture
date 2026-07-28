import type { ArchitectureModel } from './model/architecture-model.js';
import { SimpleLayoutEngine } from './layout/simple-layout-engine.js';
import { SvgRenderer } from './renderer/svg-renderer.js';
import { buildScene } from './scene/scene-builder.js';

export function generateSvg(architecture: ArchitectureModel): string {
  const layout = SimpleLayoutEngine.layout(architecture);
  const scene = buildScene(layout);

  return SvgRenderer.render(scene);
}
