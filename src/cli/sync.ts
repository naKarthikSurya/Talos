import { initCommand } from './init.js';

export async function syncCommand(args: string[]) {
  console.log('Syncing Talos workspace...');
  // Sync acts effectively like init with --target all (or the specified target)
  // Re-generating files from the core logic if necessary.
  await initCommand(args);
}
