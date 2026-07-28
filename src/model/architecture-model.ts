export interface ArchitectureNode {
  readonly id: string;
  readonly label: string;
}

export interface ArchitectureEdge {
  readonly sourceId: string;
  readonly targetId: string;
}

export interface ArchitectureModel {
  readonly nodes: readonly ArchitectureNode[];
  readonly edges: readonly ArchitectureEdge[];
}
