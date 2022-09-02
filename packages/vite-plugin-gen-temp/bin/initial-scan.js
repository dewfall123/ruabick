#!/usr/bin/env node

const { initialScan } = require('../dist/index.cjs');

(async () => {
  await initialScan();
  process.argv[3] = '.docs';
  require('vitepress/dist/node-cjs/cli.cjs');
})();
