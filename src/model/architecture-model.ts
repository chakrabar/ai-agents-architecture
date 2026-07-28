export interface ArchitectureNode {
  readonly id: string;
  readonly label: string;
  readonly group?: string;
}

export interface ArchitectureEdge {
  readonly sourceId: string;
  readonly targetId: string;
}

export interface ArchitectureModel {
  readonly name: string;
  readonly nodes: readonly ArchitectureNode[];
  readonly edges: readonly ArchitectureEdge[];
}
