import { getAgentsMd, shouldIncludeAgentsMd } from './common.js';
export const codexAdapter = {
    name: 'codex',
    async render(context) {
        const outputs = [];
        if (shouldIncludeAgentsMd(true, context)) {
            const agentsMd = getAgentsMd(context);
            if (agentsMd)
                outputs.push(agentsMd);
        }
        return outputs;
    },
};
