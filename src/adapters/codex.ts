import { Adapter, OutputFile, TalosContext } from './index.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';

export const codexAdapter: Adapter = {
  name: 'codex',
  async render(context: TalosContext): Promise<OutputFile[]> {
    const outputs: OutputFile[] = [];
    if (shouldIncludeAgentsMd(true, context)) {
      const agentsMd = getAgentsMd(context);
      if (agentsMd) outputs.push(agentsMd);
    }
    return outputs;
  },
};
