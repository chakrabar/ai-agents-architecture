export interface SpacingScale {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
}

export interface TypographyScale {
  readonly sectionTitle: number;
  readonly groupTitle: number;
  readonly primaryNode: number;
  readonly secondaryNode: number;
}

export interface LayoutMetrics {
  readonly spacing: SpacingScale;
  readonly typography: TypographyScale;
  readonly primaryNode: {
    readonly widthRatio: number;
    readonly height: number;
  };
  readonly secondaryNode: {
    readonly width: number;
    readonly height: number;
  };
  readonly group: {
    readonly containerPadding: number;
    readonly childSpacing: number;
    readonly titleAreaHeight: number;
    readonly bottomPadding: number;
  };
  readonly composition: {
    readonly minimumWidth: number;
    readonly outerMargin: number;
    readonly verticalPadding: number;
    readonly sectionTitleHeight: number;
    readonly sectionTitleSpacing: number;
    readonly verticalRhythm: number;
  };
}

const spacing: SpacingScale = Object.freeze({
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
});

export const defaultLayoutMetrics: LayoutMetrics = Object.freeze({
  spacing,
  typography: Object.freeze({
    sectionTitle: 36,
    groupTitle: 20,
    primaryNode: 18,
    secondaryNode: 14,
  }),
  primaryNode: Object.freeze({
    widthRatio: 0.68,
    height: spacing.xl + spacing.lg,
  }),
  secondaryNode: Object.freeze({
    width: spacing.xl * 3 + spacing.sm,
    height: spacing.xl + spacing.xs,
  }),
  group: Object.freeze({
    containerPadding: spacing.xl,
    childSpacing: spacing.lg,
    titleAreaHeight: spacing.xl + spacing.xs,
    bottomPadding: spacing.md,
  }),
  composition: Object.freeze({
    minimumWidth: spacing.xl * 10,
    outerMargin: spacing.xl + spacing.lg,
    verticalPadding: spacing.xl + spacing.xs,
    sectionTitleHeight: spacing.xl,
    sectionTitleSpacing: spacing.xl,
    verticalRhythm: spacing.xl * 2,
  }),
});
