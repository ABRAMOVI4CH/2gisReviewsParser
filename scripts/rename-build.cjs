const fs = require('fs');
const path = require('path');

const format = process.argv[2];
if (format !== 'cjs' && format !== 'esm') {
  console.error('Usage: node scripts/rename-build.cjs <cjs|esm>');
  process.exit(1);
}

const dir = path.join(__dirname, '..', 'dist', format);
const from = path.join(dir, 'index.js');
const to = path.join(dir, format === 'cjs' ? 'index.cjs' : 'index.mjs');

if (fs.existsSync(from)) {
  fs.renameSync(from, to);
} else {
  console.error(`Missing build output: ${from}`);
  process.exit(1);
}
