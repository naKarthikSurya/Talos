import { renderTemplate } from '../render/renderTemplate.js';
import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const geminiAdapter = {
    name: 'gemini',
    async render(context) {
        const outputs = [
            {
                path: 'GEMINI.md',
                content: renderTemplate('GEMINI.md.hbs', context),
                overwriteStrategy: 'merge',
            },
            {
                path: '.gemini/settings.json',
                content: JSON.stringify({
                    context: {
                        fileName: "GEMINI.md"
                    },
                    approvalMode: "default"
                }, null, 2),
                overwriteStrategy: 'safe',
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
