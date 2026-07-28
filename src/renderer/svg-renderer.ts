import type {
  Arrow,
  Rectangle,
  Scene,
  ScenePrimitive,
  Shadow,
  Text,
} from '../model/scene-graph.js';
import type { Renderer } from './renderer.interface.js';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function arrowMarkerId(index: number): string {
  return `arrowhead-${index}`;
}

function shadowFilterId(index: number): string {
  return `shadow-${index}`;
}

function renderArrowMarker(arrow: Arrow, index: number): string {
  return [
    `  <marker id="${arrowMarkerId(index)}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">`,
    `    <path d="M 0 0 L 10 5 L 0 10 z" fill="${escapeXml(arrow.stroke)}" fill-opacity="${arrow.strokeOpacity}"/>`,
    '  </marker>',
  ].join('\n');
}

function renderShadowFilter(shadow: Shadow, index: number): string {
  return [
    `  <filter id="${shadowFilterId(index)}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">`,
    `    <feDropShadow dx="${shadow.offsetX}" dy="${shadow.offsetY}" stdDeviation="${shadow.blurRadius / 2}" flood-color="${escapeXml(shadow.color)}" flood-opacity="${shadow.opacity}"/>`,
    '  </filter>',
  ].join('\n');
}

function renderDefinitions(scene: Scene): string {
  const definitions = scene.primitives.flatMap((primitive, index) => {
    if (primitive.kind === 'arrow') {
      return [renderArrowMarker(primitive, index)];
    }

    if (primitive.kind === 'rectangle' && primitive.shadow !== undefined) {
      return [renderShadowFilter(primitive.shadow, index)];
    }

    return [];
  });

  return ['<defs>', ...definitions, '</defs>'].join('\n');
}

function renderRectangle(rectangle: Rectangle, index: number): string {
  const shadow =
    rectangle.shadow === undefined
      ? ''
      : ` filter="url(#${shadowFilterId(index)})"`;

  return `<rect data-role="${rectangle.role}" x="${rectangle.x}" y="${rectangle.y}" width="${rectangle.width}" height="${rectangle.height}" rx="${rectangle.cornerRadius}" fill="${escapeXml(rectangle.fill)}" stroke="${escapeXml(rectangle.stroke)}" stroke-width="${rectangle.strokeWidth}" stroke-opacity="${rectangle.strokeOpacity}"${shadow}/>`;
}

function renderText(text: Text): string {
  return `<text data-role="${text.role}" x="${text.x}" y="${text.y}" text-anchor="middle" dominant-baseline="middle" font-family="${escapeXml(text.fontFamily)}" font-size="${text.fontSize}" font-weight="${text.fontWeight}" fill="${escapeXml(text.fill)}" fill-opacity="${text.fillOpacity}">${escapeXml(text.value)}</text>`;
}

function renderArrow(arrow: Arrow, index: number): string {
  return `<line x1="${arrow.startX}" y1="${arrow.startY}" x2="${arrow.endX}" y2="${arrow.endY}" stroke="${escapeXml(arrow.stroke)}" stroke-width="${arrow.strokeWidth}" stroke-opacity="${arrow.strokeOpacity}" stroke-linecap="${arrow.lineCap}" marker-end="url(#${arrowMarkerId(index)})"/>`;
}

function renderPrimitive(primitive: ScenePrimitive, index: number): string {
  switch (primitive.kind) {
    case 'rectangle':
      return renderRectangle(primitive, index);
    case 'text':
      return renderText(primitive);
    case 'arrow':
      return renderArrow(primitive, index);
  }
}

export function renderSvg(scene: Scene): string {
  const primitives = scene.primitives.map(renderPrimitive);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}">`,
    renderDefinitions(scene),
    `  <rect x="0" y="0" width="${scene.width}" height="${scene.height}" fill="${escapeXml(scene.backgroundColor)}"/>`,
    ...primitives.map((primitive) => `  ${primitive}`),
    '</svg>',
    '',
  ].join('\n');
}

export const SvgRenderer = Object.freeze({
  render: renderSvg,
}) satisfies Renderer<Scene, string>;
