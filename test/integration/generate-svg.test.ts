import { describe, expect, it } from 'vitest';
import { helloArchitecture } from '../../src/cli/hello-architecture.js';
import { generateSvg } from '../../src/generate-svg.js';

describe('rendering pipeline', () => {
  it('renders the AI coding workflow as a complete SVG string', () => {
    const svg = generateSvg(helloArchitecture);

    expect(svg).toContain('AI Agents Architecture');
    expect(svg).toContain('Entry Points');
    expect(svg).toContain('Agent Runtime');
    expect(svg).toContain('Context Assembly');
    expect(svg).toContain('Prompt Construction');
    expect(svg).toContain('Model Provider');
    expect(svg).toContain('OpenRouter');
    expect(svg).toContain('>LLM</text>');
    expect(svg).toContain('Tools');
    expect(svg).toContain('Web Search');
    expect(svg.match(/<rect /gu)).toHaveLength(20);
    expect(svg.match(/<line /gu)).toHaveLength(6);
  });
});
