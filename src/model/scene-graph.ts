export type RectangleRole = 'container' | 'primary-node' | 'secondary-node';

export type TextRole =
  'section-title' | 'container-title' | 'primary-label' | 'secondary-label';

export interface Shadow {
  readonly color: string;
  readonly opacity: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly blurRadius: number;
}

export interface Rectangle {
  readonly kind: 'rectangle';
  readonly role: RectangleRole;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly cornerRadius: number;
  readonly fill: string;
  readonly stroke: string;
  readonly strokeWidth: number;
  readonly strokeOpacity: number;
  readonly shadow?: Shadow;
}

export interface Text {
  readonly kind: 'text';
  readonly role: TextRole;
  readonly x: number;
  readonly y: number;
  readonly value: string;
  readonly fontSize: number;
  readonly fontWeight: 'normal' | 'bold';
  readonly fontFamily: string;
  readonly fill: string;
  readonly fillOpacity: number;
}

export interface Arrow {
  readonly kind: 'arrow';
  readonly startX: number;
  readonly startY: number;
  readonly endX: number;
  readonly endY: number;
  readonly stroke: string;
  readonly strokeWidth: number;
  readonly strokeOpacity: number;
  readonly lineCap: 'butt' | 'round' | 'square';
}

export type ScenePrimitive = Rectangle | Text | Arrow;

export interface Scene {
  readonly width: number;
  readonly height: number;
  readonly backgroundColor: string;
  readonly primitives: readonly ScenePrimitive[];
}
