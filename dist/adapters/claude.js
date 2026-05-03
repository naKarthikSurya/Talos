import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const claudeAdapter = {
    name: 'claude',
    async render(context) {
        const outputs = [
            {
                path: 'CLAUDE.md',
                content: renderTemplate('CLAUDE.md.hbs', context),
                overwriteStrategy: 'merge',
            }
        ];
        if (shouldIncludeAgentsMd(false, context)) {
            const agentsMd = getAgentsMd(context);
            if (agentsMd)
                outputs.push(agentsMd);
        }
        return outputs;
    },
};
