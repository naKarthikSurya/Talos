import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allAdapters } from '../adapters/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '../../');
export async function initCommand(args) {
    const targetIndex = args.indexOf('--target');
    const targetValue = targetIndex !== -1 && args[targetIndex + 1] ? args[targetIndex + 1] : 'all';
    const target = targetValue;
    const context = {
        projectRoot: process.cwd(),
        options: {
            withAgents: args.includes('--with-agents'),
            noAgents: args.includes('--no-agents'),
            universal: args.includes('--universal'),
        }
    };
    if (target === 'all' || context.options.universal) {
        context.options.universal = true;
    }
    console.log(`Initializing Talos (target: ${target})...`);
    // 1. Copy the core protocol templates to `.talos/`
    const srcCore = path.join(packageRoot, 'templates', 'core');
    const destCore = path.join(context.projectRoot, '.talos');
    if (!fs.existsSync(destCore)) {
        console.log('  Creating .talos/ directory...');
        fs.cpSync(srcCore, destCore, { recursive: true });
    }
    else {
        console.log('  .talos/ already exists, copying missing core files...');
        fs.cpSync(srcCore, destCore, { recursive: true, force: false }); // Don't overwrite existing
    }
    // 2. Execute relevant adapters
    let adaptersToRun = allAdapters;
    if (target !== 'all' && target !== 'antigravity') {
        adaptersToRun = allAdapters.filter(a => a.name === target);
    }
    else if (target === 'antigravity') {
        adaptersToRun = allAdapters.filter(a => a.name === 'antigravity');
    }
    if (adaptersToRun.length === 0) {
        console.error(`Unknown target: ${target}`);
        process.exit(1);
    }
    const pendingOutputs = new Map();
    for (const adapter of adaptersToRun) {
        const outputs = await adapter.render(context);
        for (const output of outputs) {
            pendingOutputs.set(output.path, output);
        }
    }
    for (const output of pendingOutputs.values()) {
        const outPath = path.join(context.projectRoot, output.path);
        const outDir = path.dirname(outPath);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }
        if (fs.existsSync(outPath) && output.overwriteStrategy === 'safe') {
            console.log(`  Skipping ${output.path} (already exists, strategy safe)`);
            continue;
        }
        fs.writeFileSync(outPath, output.content);
        console.log(`  ✓ Generated ${output.path}`);
    }
    console.log('\n✅ Talos initialized successfully!');
    console.log('Next: Update .talos/state.yaml with your project stack and task description.');
}
