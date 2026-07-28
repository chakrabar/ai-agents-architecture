import { describe, expect, it } from 'vitest';
import type { ArchitectureModel } from '../../src/model/architecture-model.js';
import { createSimpleLayout } from '../../src/layout/simple-layout-engine.js';

describe('SimpleLayoutEngine', () => {
  it('stacks nodes vertically with fixed dimensions and spacing', () => {
    const architecture: ArchitectureModel = {
      nodes: [
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second' },
        { id: 'third', label: 'Third' },
      ],
      edges: [
        { sourceId: 'first', targetId: 'second' },
        { sourceId: 'second', targetId: 'third' },
      ],
    };

    expect(createSimpleLayout(architecture)).toEqual({
      width: 304,
      height: 384,
      nodes: [
        {
          id: 'first',
          label: 'First',
          x: 32,
          y: 32,
          width: 240,
          height: 64,
        },
        {
          id: 'second',
          label: 'Second',
          x: 32,
          y: 160,
          width: 240,
          height: 64,
        },
        {
          id: 'third',
          label: 'Third',
          x: 32,
          y: 288,
          width: 240,
          height: 64,
        },
      ],
      edges: [
        { sourceId: 'first', targetId: 'second' },
        { sourceId: 'second', targetId: 'third' },
      ],
    });
  });
});
