import path from 'path';

const repoRoot = path.resolve(__dirname, '../');

const bowerRepo = 'git@github.com:react-bootstrap/react-bootstrap-bower.git';
const docsRepo = 'git@github.com:react-bootstrap/react-bootstrap.github.io.git';

const srcRoot = path.join(repoRoot, 'src/');
const distRoot = path.join(repoRoot, 'dist/');
const libRoot = path.join(repoRoot, 'lib/');
const bowerRoot = path.join(repoRoot, 'amd/');
const docsRoot = path.join(repoRoot, 'docs-built/');

const tmpBowerRepo = path.join(repoRoot, 'tmp-bower-repo');
const tmpDocsRepo = path.join(repoRoot, 'tmp-docs-repo');

export {
  repoRoot,
  srcRoot, distRoot, libRoot,
  bowerRepo, bowerRoot, tmpBowerRepo,
  docsRoot, docsRepo, tmpDocsRepo,
};
