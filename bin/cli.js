#!/usr/bin/env node

import { run } from '../dist/cli/index.js';

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
