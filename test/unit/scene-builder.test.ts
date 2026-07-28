import { describe, expect, it } from 'vitest';
import type { LayoutModel } from '../../src/model/layout-model.js';
import { buildScene } from '../../src/scene/scene-builder.js';
import { lightTheme } from '../../src/scene/visual-theme.js';

describe('SceneBuilder', () => {
  it('converts grouped layout stages into renderer-neutral primitives', () => {
    const layout: LayoutModel = {
      width: 400,
      height: 400,
      sectionTitle: {
        text: 'Architecture',
        x: 200,
        y: 30,
        fontSize: 28,
      },
      stages: [
        {
          kind: 'group',
          id: 'group:Inputs',
          title: 'Inputs',
          x: 20,
          y: 70,
          width: 360,
          height: 120,
          titleX: 200,
          titleY: 94,
          titleFontSize: 18,
          children: [
            {
              kind: 'node',
              id: 'input',
              label: 'Input',
              x: 40,
              y: 118,
              width: 136,
              height: 52,
              fontSize: 14,
            },
          ],
        },
        {
          kind: 'node',
          id: 'runtime',
          label: 'Runtime',
          x: 60,
          y: 254,
          width: 280,
          height: 64,
          fontSize: 16,
        },
      ],
      edges: [{ sourceId: 'group:Inputs', targetId: 'runtime' }],
    };

    const scene = buildScene(layout);

    expect(scene.backgroundColor).toBe(lightTheme.canvas.fill);
    expect(scene.primitives[0]).toEqual({
      kind: 'arrow',
      startX: 200,
      startY: 190,
      endX: 200,
      endY: 254,
      ...lightTheme.arrow,
    });
    expect(scene.primitives).toContainEqual({
      kind: 'text',
      role: 'section-title',
      x: 200,
      y: 30,
      value: 'Architecture',
      ...lightTheme.text['section-title'],
    });
    expect(scene.primitives).toContainEqual({
      kind: 'rectangle',
      role: 'container',
      x: 20,
      y: 70,
      width: 360,
      height: 120,
      ...lightTheme.rectangles.container,
    });
    expect(scene.primitives).toContainEqual({
      kind: 'text',
      role: 'container-title',
      x: 200,
      y: 94,
      value: 'Inputs',
      ...lightTheme.text['container-title'],
    });
    expect(scene.primitives).toContainEqual({
      kind: 'rectangle',
      role: 'secondary-node',
      x: 40,
      y: 118,
      width: 136,
      height: 52,
      ...lightTheme.rectangles['secondary-node'],
    });
    expect(scene.primitives).toContainEqual({
      kind: 'text',
      role: 'primary-label',
      x: 200,
      y: 286,
      value: 'Runtime',
      ...lightTheme.text['primary-label'],
    });
    expect(scene.primitives).toContainEqual({
      kind: 'rectangle',
      role: 'primary-node',
      x: 60,
      y: 254,
      width: 280,
      height: 64,
      ...lightTheme.rectangles['primary-node'],
    });
  });

  it('rejects edges that reference an unknown stage', () => {
    const layout: LayoutModel = {
      width: 100,
      height: 100,
      sectionTitle: {
        text: 'Architecture',
        x: 50,
        y: 20,
        fontSize: 28,
      },
      stages: [],
      edges: [{ sourceId: 'missing', targetId: 'also-missing' }],
    };

    expect(() => buildScene(layout)).toThrow(
      'Layout edge references unknown stage "missing".',
    );
  });
});
