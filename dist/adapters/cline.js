import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const clineAdapter = {
    name: 'cline',
    async render(context) {
        const outputs = [
            {
                path: '.clinerules/talos-core.md',
                content: renderTemplate('cline-rule.md.hbs', context),
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
