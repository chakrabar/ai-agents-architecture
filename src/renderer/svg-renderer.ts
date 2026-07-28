import type {
  Arrow,
  Rectangle,
  Scene,
  ScenePrimitive,
  Text,
} from '../model/scene-graph.js';
import type { Renderer } from './renderer.interface.js';

const ARROW_MARKER_ID = 'arrowhead';
const FONT_FAMILY =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderRectangle(rectangle: Rectangle): string {
  return `<rect x="${rectangle.x}" y="${rectangle.y}" width="${rectangle.width}" height="${rectangle.height}" rx="${rectangle.cornerRadius}" fill="none" stroke="currentColor"/>`;
}

function renderText(text: Text): string {
  return `<text x="${text.x}" y="${text.y}" text-anchor="middle" dominant-baseline="middle" font-size="${text.fontSize}" font-weight="${text.fontWeight}" fill="currentColor">${escapeXml(text.value)}</text>`;
}

function renderArrow(arrow: Arrow): string {
  return `<line x1="${arrow.startX}" y1="${arrow.startY}" x2="${arrow.endX}" y2="${arrow.endY}" stroke="currentColor" marker-end="url(#${ARROW_MARKER_ID})"/>`;
}

function renderPrimitive(primitive: ScenePrimitive): string {
  switch (primitive.kind) {
    case 'rectangle':
      return renderRectangle(primitive);
    case 'text':
      return renderText(primitive);
    case 'arrow':
      return renderArrow(primitive);
  }
}

function renderArrowMarker(): string {
  return [
    '<defs>',
    `  <marker id="${ARROW_MARKER_ID}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">`,
    '    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>',
    '  </marker>',
    '</defs>',
  ].join('\n');
}

export function renderSvg(scene: Scene): string {
  const primitives = scene.primitives.map(renderPrimitive);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" font-family="${FONT_FAMILY}">`,
    renderArrowMarker(),
    ...primitives.map((primitive) => `  ${primitive}`),
    '</svg>',
    '',
  ].join('\n');
}

export const SvgRenderer = Object.freeze({
  render: renderSvg,
}) satisfies Renderer<Scene, string>;
