import type { ArchitectureModel } from '../model/architecture-model.js';

export const helloArchitecture: ArchitectureModel = {
  nodes: [
    { id: 'entry-points', label: 'Entry Points' },
    { id: 'agent-runtime', label: 'Agent Runtime' },
    { id: 'agent', label: 'Agent' },
  ],
  edges: [
    { sourceId: 'entry-points', targetId: 'agent-runtime' },
    { sourceId: 'agent-runtime', targetId: 'agent' },
  ],
};
