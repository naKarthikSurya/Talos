import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const windsurfAdapter = {
    name: 'windsurf',
    async render(context) {
        const outputs = [
            {
                path: '.windsurfrules',
                content: renderTemplate('cline-rule.md.hbs', context), // Windsurf rules are similar to Cline's plain markdown
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
