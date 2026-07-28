export interface LayoutNode {
  readonly kind: 'node';
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fontSize: number;
}

export interface LayoutGroup {
  readonly kind: 'group';
  readonly id: string;
  readonly title: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly titleX: number;
  readonly titleY: number;
  readonly titleFontSize: number;
  readonly children: readonly LayoutNode[];
}

export type LayoutStage = LayoutNode | LayoutGroup;

export interface LayoutSectionTitle {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly fontSize: number;
}

export interface LayoutEdge {
  readonly sourceId: string;
  readonly targetId: string;
}

export interface LayoutModel {
  readonly width: number;
  readonly height: number;
  readonly sectionTitle: LayoutSectionTitle;
  readonly stages: readonly LayoutStage[];
  readonly edges: readonly LayoutEdge[];
}
