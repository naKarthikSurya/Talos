import { Adapter, OutputFile, TalosContext } from './index.js';
import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';

export const cursorAdapter: Adapter = {
  name: 'cursor',
  async render(context: TalosContext): Promise<OutputFile[]> {
    const outputs: OutputFile[] = [
      {
        path: '.cursor/rules/talos-core.mdc',
        content: renderTemplate('cursor-rule.mdc.hbs', context),
        overwriteStrategy: 'merge',
      }
    ];
    if (shouldIncludeAgentsMd(true, context)) {
      const agentsMd = getAgentsMd(context);
      if (agentsMd) outputs.push(agentsMd);
    }
    return outputs;
  },
};
