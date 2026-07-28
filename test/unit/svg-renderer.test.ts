import { describe, expect, it } from 'vitest';
import type { Scene } from '../../src/model/scene-graph.js';
import { renderSvg } from '../../src/renderer/svg-renderer.js';

describe('SvgRenderer', () => {
  it('serializes the fully specified Scene without inferring presentation', () => {
    const scene: Scene = {
      width: 200,
      height: 120,
      backgroundColor: '#FAFAFA',
      primitives: [
        {
          kind: 'rectangle',
          role: 'primary-node',
          x: 20,
          y: 20,
          width: 160,
          height: 60,
          cornerRadius: 12,
          fill: '#E0E8F2',
          stroke: '#202936',
          strokeWidth: 1.25,
          strokeOpacity: 0.18,
          shadow: {
            color: '#202936',
            opacity: 0.12,
            offsetX: 0,
            offsetY: 3,
            blurRadius: 8,
          },
        },
        {
          kind: 'text',
          role: 'primary-label',
          x: 100,
          y: 50,
          value: `Agents & <tools> "ready"`,
          fontFamily: `Inter, "Segoe UI", sans-serif`,
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#202936',
          fillOpacity: 0.96,
        },
        {
          kind: 'arrow',
          startX: 100,
          startY: 80,
          endX: 100,
          endY: 110,
          stroke: '#202936',
          strokeWidth: 1.5,
          strokeOpacity: 0.5,
          lineCap: 'round',
        },
      ],
    };

    const svg = renderSvg(scene);

    expect(svg).toContain(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">',
    );
    expect(svg).toContain(
      '<rect x="0" y="0" width="200" height="120" fill="#FAFAFA"/>',
    );
    expect(svg).toContain(
      'data-role="primary-node" x="20" y="20" width="160" height="60" rx="12" fill="#E0E8F2"',
    );
    expect(svg).toContain('filter="url(#shadow-0)"');
    expect(svg).toContain(
      '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#202936" flood-opacity="0.12"/>',
    );
    expect(svg).toContain('data-role="primary-label" x="100" y="50"');
    expect(svg).toContain(
      'font-family="Inter, &quot;Segoe UI&quot;, sans-serif"',
    );
    expect(svg).toContain('font-size="18" font-weight="bold"');
    expect(svg).toContain('Agents &amp; &lt;tools&gt; &quot;ready&quot;');
    expect(svg).toContain(
      'stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"',
    );
    expect(svg).toContain('marker-end="url(#arrowhead-2)"');
    expect(svg).toMatch(/<\/svg>\n$/);
  });
});
