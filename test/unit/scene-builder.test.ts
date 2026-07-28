import { describe, expect, it } from 'vitest';
import type { LayoutModel } from '../../src/model/layout-model.js';
import { buildScene } from '../../src/scene/scene-builder.js';

describe('SceneBuilder', () => {
  it('converts positioned nodes and edges into scene primitives', () => {
    const layout: LayoutModel = {
      width: 120,
      height: 180,
      nodes: [
        {
          id: 'source',
          label: 'Source',
          x: 10,
          y: 10,
          width: 100,
          height: 40,
        },
        {
          id: 'target',
          label: 'Target',
          x: 10,
          y: 130,
          width: 100,
          height: 40,
        },
      ],
      edges: [{ sourceId: 'source', targetId: 'target' }],
    };

    expect(buildScene(layout)).toEqual({
      width: 120,
      height: 180,
      primitives: [
        {
          kind: 'arrow',
          startX: 60,
          startY: 50,
          endX: 60,
          endY: 130,
        },
        {
          kind: 'rectangle',
          x: 10,
          y: 10,
          width: 100,
          height: 40,
          cornerRadius: 12,
        },
        { kind: 'text', x: 60, y: 30, value: 'Source' },
        {
          kind: 'rectangle',
          x: 10,
          y: 130,
          width: 100,
          height: 40,
          cornerRadius: 12,
        },
        { kind: 'text', x: 60, y: 150, value: 'Target' },
      ],
    });
  });

  it('rejects edges that reference an unknown node', () => {
    const layout: LayoutModel = {
      width: 100,
      height: 100,
      nodes: [],
      edges: [{ sourceId: 'missing', targetId: 'also-missing' }],
    };

    expect(() => buildScene(layout)).toThrow(
      'Layout edge references unknown node "missing".',
    );
  });
});
