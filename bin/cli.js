#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];
const packageRoot = path.join(__dirname, '..');  // root of ai-agents-squad package
const templatePath = path.join(packageRoot, 'templates');

// ─── SYNC ────────────────────────────────────────────────────────────────────
// Rebuilds templates/ from the live .agents/ and ai-control/ in the package root.
// Called automatically before init, and available as a standalone command.

function syncTemplates() {
  const sources = ['.agents', 'ai-control', '.cursorrules', '.clinerules', '.ai-rules.md'];

  console.log('Syncing templates from live source...');
  
  if (!fs.existsSync(templatePath)) {
    fs.mkdirSync(templatePath, { recursive: true });
  }

  sources.forEach(folder => {
    const src = path.join(packageRoot, folder);
    const dest = path.join(templatePath, folder);

    if (!fs.existsSync(src)) {
      console.warn(`  Warning: source ${folder}/ not found in package. Skipping.`);
      return;
    }

    // Delete old template copy
    if (fs.existsSync(dest)) {
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${dest}"`);
      } else {
        execSync(`rm -rf "${dest}"`);
      }
    }

    // Copy fresh from live source
    if (process.platform === 'win32') {
      execSync(`xcopy "${src}" "${dest}" /E /I /H /Y`);
    } else {
      execSync(`cp -r "${src}" "${dest}"`);
    }

    console.log(`  ✓ templates/${folder} rebuilt from ./${folder}`);
  });

  console.log('Templates synced successfully.');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
// Syncs templates first, then copies them into the target project.

if (command === 'init') {
  const projectRoot = process.cwd();
  const overwrite = process.argv.includes('--overwrite');

  // If running init from inside the package itself, just sync templates and stop
  if (projectRoot === packageRoot) {
    console.log('Running inside the Talos package — syncing templates only.');
    syncTemplates();
    process.exit(0);
  }

  console.log('Initializing Talos...');

  // Always sync templates before copying so they are up to date
  try {
    syncTemplates();
  } catch (err) {
    console.warn('Warning: Could not sync templates:', err.message);
  }

  // Copy .agents and ai-control into the target project
  const folders = ['.agents', 'ai-control', '.cursorrules', '.clinerules', '.ai-rules.md'];

  folders.forEach(folder => {
    const src = path.join(templatePath, folder);
    const dest = path.join(projectRoot, folder);

    if (fs.existsSync(dest) && !overwrite) {
      console.warn(`  Warning: ${folder}/ already exists in this project. Skipping.`);
    } else {
      if (fs.existsSync(dest) && overwrite) {
        console.log(`  Overwriting ${folder}/...`);
        if (process.platform === 'win32') {
          execSync(`rmdir /s /q "${dest}"`);
        } else {
          execSync(`rm -rf "${dest}"`);
        }
      } else {
        console.log(`  Creating ${folder}/...`);
      }
      try {
        if (process.platform === 'win32') {
          execSync(`xcopy "${src}" "${dest}" /E /I /H /Y`);
        } else {
          execSync(`cp -r "${src}" "${dest}"`);
        }
        console.log(`  ✓ ${folder} created`);
      } catch (err) {
        console.error(`  Error copying ${folder}:`, err.message);
      }
    }
  });

  // Add to .git/info/exclude if inside a git repo
  const gitExcludePath = path.join(projectRoot, '.git/info/exclude');
  if (fs.existsSync(path.join(projectRoot, '.git'))) {
    console.log('Adding to .git/info/exclude...');
    try {
      if (!fs.existsSync(path.dirname(gitExcludePath))) {
        fs.mkdirSync(path.dirname(gitExcludePath), { recursive: true });
      }

      let currentExclude = '';
      if (fs.existsSync(gitExcludePath)) {
        currentExclude = fs.readFileSync(gitExcludePath, 'utf8');
      }

      const finalizedExcludes = folders.map(f => f.startsWith('.') && !f.includes('/', 1) && f !== '.agents' ? f : `${f}/`);
      const newExcludes = finalizedExcludes.filter(f => !currentExclude.includes(f));

      if (newExcludes.length > 0) {
        const appendText =
          (currentExclude.endsWith('\n') ? '' : '\n') +
          '# Antigravity Talos AI\n' +
          newExcludes.join('\n') + '\n';
        fs.appendFileSync(gitExcludePath, appendText);
        console.log('  ✓ Folders added to .git/info/exclude');
      } else {
        console.log('  ✓ Already excluded');
      }
    } catch (err) {
      console.warn('  Warning: Could not update .git/info/exclude:', err.message);
    }
  }

  console.log('\n✅ Talos initialized successfully!');
  console.log('Next: Update ai-control/state.md with your project stack and task description.');

// ─── SYNC (standalone command) ────────────────────────────────────────────────
} else if (command === 'sync') {
  try {
    syncTemplates();
  } catch (err) {
    console.error('Sync failed:', err.message);
    process.exit(1);
  }

} else {
  console.log('Usage:');
  console.log('  talos init [--overwrite] — Initialize Talos (use --overwrite to update existing folders)');
  console.log('  talos sync   — Rebuild templates from live source');
}
