import { renderTemplate } from '../render/renderTemplate.js';
export function getAgentsMd(context) {
    if (context.options.noAgents)
        return null;
    return {
        path: 'AGENTS.md',
        content: renderTemplate('AGENTS.md.hbs', context),
        overwriteStrategy: 'merge',
    };
}
export function shouldIncludeAgentsMd(defaultInclude, context) {
    if (context.options.noAgents)
        return false;
    if (context.options.withAgents || context.options.universal)
        return true;
    return defaultInclude;
}
