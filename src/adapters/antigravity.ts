import { Adapter, OutputFile, TalosContext } from './index.js';
import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';

export const antigravityAdapter: Adapter = {
  name: 'antigravity',
  async render(context: TalosContext): Promise<OutputFile[]> {
    const outputs: OutputFile[] = [
      {
        path: '.ai-rules.md',
        content: renderTemplate('cline-rule.md.hbs', context), // Fallback
        overwriteStrategy: 'merge',
      }
    ];
    if (shouldIncludeAgentsMd(false, context)) {
      const agentsMd = getAgentsMd(context);
      if (agentsMd) outputs.push(agentsMd);
    }
    return outputs;
  },
};
