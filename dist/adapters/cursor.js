import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const cursorAdapter = {
    name: 'cursor',
    async render(context) {
        const outputs = [
            {
                path: '.cursor/rules/talos-core.mdc',
                content: renderTemplate('cursor-rule.mdc.hbs', context),
                overwriteStrategy: 'merge',
            }
        ];
        if (shouldIncludeAgentsMd(true, context)) {
            const agentsMd = getAgentsMd(context);
            if (agentsMd)
                outputs.push(agentsMd);
        }
        return outputs;
    },
};
