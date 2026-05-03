import { renderTemplate } from '../render/renderTemplate.js';
import { OutputFile, TalosContext } from './index.js';

export function getAgentsMd(context: TalosContext): OutputFile | null {
  if (context.options.noAgents) return null;
  return {
    path: 'AGENTS.md',
    content: renderTemplate('AGENTS.md.hbs', context),
    overwriteStrategy: 'merge',
  };
}

export function shouldIncludeAgentsMd(defaultInclude: boolean, context: TalosContext): boolean {
  if (context.options.noAgents) return false;
  if (context.options.withAgents || context.options.universal) return true;
  return defaultInclude;
}
