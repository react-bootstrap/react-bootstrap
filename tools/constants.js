const path = require('path');

const repoRoot = path.resolve(__dirname, '../');

const srcRoot = path.join(repoRoot, 'src/');
const distRoot = path.join(repoRoot, 'dist/');
const libRoot = path.join(repoRoot, 'lib/');
const esRoot = path.join(repoRoot, 'es/');
const bowerRoot = path.join(repoRoot, 'amd/');
const docsRoot = path.join(repoRoot, 'docs-built/');

module.exports = {
  repoRoot,
  srcRoot,
  distRoot,
  libRoot,
  esRoot,
  bowerRoot,
  docsRoot
};
