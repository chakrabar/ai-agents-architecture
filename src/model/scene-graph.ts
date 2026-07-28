export interface Rectangle {
  readonly kind: 'rectangle';
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly cornerRadius: number;
}

export interface Text {
  readonly kind: 'text';
  readonly x: number;
  readonly y: number;
  readonly value: string;
  readonly fontSize: number;
  readonly fontWeight: 'normal' | 'bold';
}

export interface Arrow {
  readonly kind: 'arrow';
  readonly startX: number;
  readonly startY: number;
  readonly endX: number;
  readonly endY: number;
}

export type ScenePrimitive = Rectangle | Text | Arrow;

export interface Scene {
  readonly width: number;
  readonly height: number;
  readonly primitives: readonly ScenePrimitive[];
}
