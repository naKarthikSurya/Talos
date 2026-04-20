#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];

if (command === 'init') {
  const projectRoot = process.cwd();
  const templatePath = path.join(__dirname, '../templates');

  console.log('Initializing AI Agents Squad...');

  // Copy .agents and ai-control
  const folders = ['.agents', 'ai-control'];

  folders.forEach(folder => {
    const src = path.join(templatePath, folder);
    const dest = path.join(projectRoot, folder);

    if (fs.existsSync(dest)) {
      console.warn(`Warning: ${folder} already exists. Skipping.`);
    } else {
      console.log(`Creating ${folder}...`);
      try {
        if (process.platform === 'win32') {
          execSync(`xcopy "${src}" "${dest}" /E /I /H /Y`);
        } else {
          execSync(`cp -r "${src}" "${dest}"`);
        }
      } catch (err) {
        console.error(`Error copying ${folder}:`, err.message);
      }
    }
  });

  // Add to .git/info/exclude if it exists
  const gitExcludePath = path.join(projectRoot, '.git/info/exclude');
  if (fs.existsSync(path.join(projectRoot, '.git'))) {
    console.log('Adding folders to .git/info/exclude...');
    try {
      if (!fs.existsSync(path.dirname(gitExcludePath))) {
        fs.mkdirSync(path.dirname(gitExcludePath), { recursive: true });
      }

      let currentExclude = '';
      if (fs.existsSync(gitExcludePath)) {
        currentExclude = fs.readFileSync(gitExcludePath, 'utf8');
      }

      const toExclude = folders.map(f => `${f}/`);
      const newExcludes = toExclude.filter(f => !currentExclude.includes(f));

      if (newExcludes.length > 0) {
        const appendText = (currentExclude.endsWith('\n') ? '' : '\n') +
          '# Antigravity AI Agents Squad\n' +
          newExcludes.join('\n') + '\n';
        fs.appendFileSync(gitExcludePath, appendText);
        console.log('Folders added to .git/info/exclude.');
      } else {
        console.log('Folders already excluded.');
      }
    } catch (err) {
      console.warn('Warning: Could not update .git/info/exclude:', err.message);
    }
  }

  console.log('Successfully initialized AI Agents Squad!');
  console.log('You can now use the following roles: Product Manager, Architect, Developer, Tech Lead.');
} else {
  console.log('Usage: antigravity-squad init');
}
