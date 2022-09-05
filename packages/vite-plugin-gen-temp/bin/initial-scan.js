#!/usr/bin/env node

const { initialScan } = require('../dist/index.cjs');
const minimist = require('minimist');

console.log('扫描开始');

(async () => {
  await initialScan();

  const argv = minimist(process.argv.slice(2));

  // 修改 process.argv 把root替换成.docs
  process.argv = process.argv.slice(0, 2);

  const command = argv._[0];
  const root = argv._[1];

  console.log(argv);

  if (!(command && root)) {
    throw new Error('vitepress command and root cannot be missing!');
  }
  process.argv.push(command);
  process.argv.push('.docs');

  for (const key in argv) {
    if (key === '_') {
      continue;
    }
    process.argv.push(`--${key}=${argv[key]}`);
  }

  console.log(process.argv);

  require('vitepress/dist/node-cjs/cli.cjs');
})();
