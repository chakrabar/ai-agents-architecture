/**
 * Extension point for transforming a renderer-agnostic scene graph into an
 * output representation.
 */
export interface Renderer<TSceneGraph, TOutput> {
  render(sceneGraph: TSceneGraph): TOutput;
}
