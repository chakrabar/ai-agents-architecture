import type { RectangleRole, Shadow, TextRole } from '../model/scene-graph.js';

export interface RectangleStyle {
  readonly fill: string;
  readonly stroke: string;
  readonly strokeWidth: number;
  readonly strokeOpacity: number;
  readonly cornerRadius: number;
  readonly shadow?: Shadow;
}

export interface TextStyle {
  readonly fill: string;
  readonly fillOpacity: number;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: 'normal' | 'bold';
}

export interface ArrowStyle {
  readonly stroke: string;
  readonly strokeWidth: number;
  readonly strokeOpacity: number;
  readonly lineCap: 'butt' | 'round' | 'square';
}

export interface VisualTheme {
  readonly canvas: {
    readonly fill: string;
  };
  readonly rectangles: Readonly<Record<RectangleRole, RectangleStyle>>;
  readonly text: Readonly<Record<TextRole, TextStyle>>;
  readonly arrow: ArrowStyle;
}

const colors = Object.freeze({
  canvas: '#F7F8FA',
  surface: '#FFFFFF',
  container: '#F0F2F5',
  primary: '#E3EAF4',
  ink: '#202936',
});

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const lightTheme: VisualTheme = Object.freeze({
  canvas: Object.freeze({
    fill: colors.canvas,
  }),
  rectangles: Object.freeze({
    container: Object.freeze({
      fill: colors.container,
      stroke: colors.ink,
      strokeWidth: 1,
      strokeOpacity: 0.12,
      cornerRadius: 18,
    }),
    'primary-node': Object.freeze({
      fill: colors.primary,
      stroke: colors.ink,
      strokeWidth: 1.25,
      strokeOpacity: 0.18,
      cornerRadius: 16,
      shadow: Object.freeze({
        color: colors.ink,
        opacity: 0.12,
        offsetX: 0,
        offsetY: 3,
        blurRadius: 8,
      }),
    }),
    'secondary-node': Object.freeze({
      fill: colors.surface,
      stroke: colors.ink,
      strokeWidth: 1,
      strokeOpacity: 0.14,
      cornerRadius: 12,
    }),
  }),
  text: Object.freeze({
    'section-title': Object.freeze({
      fill: colors.ink,
      fillOpacity: 1,
      fontFamily,
      fontSize: 36,
      fontWeight: 'bold',
    }),
    'container-title': Object.freeze({
      fill: colors.ink,
      fillOpacity: 0.9,
      fontFamily,
      fontSize: 20,
      fontWeight: 'bold',
    }),
    'primary-label': Object.freeze({
      fill: colors.ink,
      fillOpacity: 0.96,
      fontFamily,
      fontSize: 18,
      fontWeight: 'bold',
    }),
    'secondary-label': Object.freeze({
      fill: colors.ink,
      fillOpacity: 0.78,
      fontFamily,
      fontSize: 14,
      fontWeight: 'normal',
    }),
  }),
  arrow: Object.freeze({
    stroke: colors.ink,
    strokeWidth: 1.5,
    strokeOpacity: 0.5,
    lineCap: 'round',
  }),
});
