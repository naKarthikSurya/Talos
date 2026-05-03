import { initCommand } from './init.js';
import { doctorCommand } from './doctor.js';
import { detectCommand } from './detect.js';
import { syncCommand } from './sync.js';
export async function run() {
    const args = process.argv.slice(2);
    const command = args[0];
    switch (command) {
        case 'init':
            await initCommand(args);
            break;
        case 'doctor':
            await doctorCommand();
            break;
        case 'detect':
            await detectCommand();
            break;
        case 'sync':
        case 'render': // We can map render to sync for now or implement separately later
            await syncCommand(args);
            break;
        default:
            console.log('Usage:');
            console.log('  talos init [--target <target>] [--with-agents] [--no-agents]');
            console.log('  talos doctor');
            console.log('  talos detect');
            console.log('  talos sync [--target all]');
            break;
    }
}
