import { describe, expect, it } from 'vitest';
import type { ArchitectureModel } from '../../src/model/architecture-model.js';
import { defaultLayoutMetrics } from '../../src/layout/layout-metrics.js';
import { createSimpleLayout } from '../../src/layout/simple-layout-engine.js';

describe('SimpleLayoutEngine', () => {
  it('uses the widest group to balance every top-level stage', () => {
    const architecture: ArchitectureModel = {
      name: 'Example',
      nodes: [
        { id: 'first', label: 'First', group: 'Inputs' },
        { id: 'second', label: 'Second', group: 'Inputs' },
        { id: 'runtime', label: 'Runtime' },
        { id: 'one', label: 'One', group: 'Outputs' },
        { id: 'two', label: 'Two', group: 'Outputs' },
        { id: 'three', label: 'Three', group: 'Outputs' },
      ],
      edges: [
        { sourceId: 'first', targetId: 'runtime' },
        { sourceId: 'second', targetId: 'runtime' },
        { sourceId: 'runtime', targetId: 'one' },
        { sourceId: 'runtime', targetId: 'two' },
        { sourceId: 'runtime', targetId: 'three' },
      ],
    };

    const layout = createSimpleLayout(architecture);

    expect(layout).toMatchObject({
      width: 800,
      height: 752,
      sectionTitle: {
        text: 'Example',
        x: 400,
        y: 80,
        fontSize: 36,
      },
      edges: [
        { sourceId: 'group:Inputs', targetId: 'runtime' },
        { sourceId: 'runtime', targetId: 'group:Outputs' },
      ],
    });

    const [inputs, runtime, outputs] = layout.stages;

    expect(inputs).toMatchObject({
      kind: 'group',
      id: 'group:Inputs',
      x: 80,
      y: 152,
      width: 640,
      height: 136,
    });
    expect(runtime).toMatchObject({
      kind: 'node',
      id: 'runtime',
      x: 182.5,
      y: 384,
      width: 435,
      height: 80,
    });
    expect(outputs).toMatchObject({
      kind: 'group',
      id: 'group:Outputs',
      x: 80,
      y: 560,
      width: 640,
      height: 136,
    });

    expect(layout.stages.map((stage) => stage.x + stage.width / 2)).toEqual([
      400, 400, 400,
    ]);
    expect(runtime?.width).toBeCloseTo(
      640 * defaultLayoutMetrics.primaryNode.widthRatio,
      0,
    );

    if (inputs?.kind !== 'group' || outputs?.kind !== 'group') {
      throw new Error('Expected grouped layout stages.');
    }

    expect(inputs.children.map((child) => child.x)).toEqual([224, 416]);
    expect(outputs.children.map((child) => child.x)).toEqual([128, 320, 512]);
  });
});
