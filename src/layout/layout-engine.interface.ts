/**
 * Extension point for deterministic transformations from an architecture
 * model into a layout model.
 */
export interface LayoutEngine<TArchitectureModel, TLayoutModel> {
  layout(architecture: TArchitectureModel): TLayoutModel;
}
