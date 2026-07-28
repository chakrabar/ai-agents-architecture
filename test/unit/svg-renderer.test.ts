import { describe, expect, it } from 'vitest';
import type { Scene } from '../../src/model/scene-graph.js';
import { renderSvg } from '../../src/renderer/svg-renderer.js';

describe('SvgRenderer', () => {
  it('renders scene primitives as valid SVG markup', () => {
    const scene: Scene = {
      width: 200,
      height: 120,
      primitives: [
        {
          kind: 'rectangle',
          x: 20,
          y: 20,
          width: 160,
          height: 60,
          cornerRadius: 12,
        },
        {
          kind: 'text',
          x: 100,
          y: 50,
          value: `Agents & <tools> "ready"`,
        },
        {
          kind: 'arrow',
          startX: 100,
          startY: 80,
          endX: 100,
          endY: 110,
        },
      ],
    };

    const svg = renderSvg(scene);

    expect(svg).toContain(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">',
    );
    expect(svg).toContain(
      '<rect x="20" y="20" width="160" height="60" rx="12"',
    );
    expect(svg).toContain('text-anchor="middle" dominant-baseline="middle"');
    expect(svg).toContain('Agents &amp; &lt;tools&gt; &quot;ready&quot;');
    expect(svg).toContain('marker-end="url(#arrowhead)"');
    expect(svg).toMatch(/<\/svg>\n$/);
  });
});
