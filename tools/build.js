import 'colors';
import bower from './amd/build';
import lib from './lib/build';
import es from './es/build';
import dist from './dist/build';
import { copy } from './fs-utils';
import { distRoot, bowerRoot } from './constants';
import { exec } from './exec';

function forkAndBuildDocs({verbose}) {
  console.log('Building: '.cyan + 'docs'.green);

  const verboseOption = verbose ? '--verbose' : '';

  return exec(`npm run docs-build -- ${verboseOption}`)
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}

export default function Build(options) {
  return Promise.all([
    lib(),
    es(),
    bower(),
    dist(),
    forkAndBuildDocs(options)
  ])
  .then(() => copy(distRoot, bowerRoot));
}
