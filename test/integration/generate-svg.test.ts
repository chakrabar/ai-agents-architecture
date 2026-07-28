import { describe, expect, it } from 'vitest';
import { generateSvg } from '../../src/generate-svg.js';
import type { ArchitectureModel } from '../../src/model/architecture-model.js';

describe('rendering pipeline', () => {
  it('transforms an architecture model into an SVG string', () => {
    const architecture: ArchitectureModel = {
      nodes: [
        { id: 'entry-points', label: 'Entry Points' },
        { id: 'agent-runtime', label: 'Agent Runtime' },
        { id: 'agent', label: 'Agent' },
      ],
      edges: [
        { sourceId: 'entry-points', targetId: 'agent-runtime' },
        { sourceId: 'agent-runtime', targetId: 'agent' },
      ],
    };

    const svg = generateSvg(architecture);

    expect(svg).toContain('Entry Points');
    expect(svg).toContain('Agent Runtime');
    expect(svg).toContain('>Agent</text>');
    expect(svg.match(/<rect /gu)).toHaveLength(3);
    expect(svg.match(/<line /gu)).toHaveLength(2);
  });
});
