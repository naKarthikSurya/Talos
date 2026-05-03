import { Adapter, OutputFile, TalosContext } from './index.js';
import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';

export const aiderAdapter: Adapter = {
  name: 'aider',
  async render(context: TalosContext): Promise<OutputFile[]> {
    const outputs: OutputFile[] = [
      {
        path: 'CONVENTIONS.md',
        content: renderTemplate('CONVENTIONS.md.hbs', context),
        overwriteStrategy: 'merge',
      },
      {
        path: '.aider.conf.yml',
        content: renderTemplate('aider-conf.yml.hbs', context),
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
