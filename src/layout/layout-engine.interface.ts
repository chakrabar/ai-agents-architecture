/**
 * Extension point for deterministic transformations from an architecture
 * model into a layout model.
 */
export interface LayoutEngine<TArchitectureModel, TLayoutModel> {
  readonly layout: (architecture: TArchitectureModel) => TLayoutModel;
}
