import 'colors';
import bower from './amd/build';
import lib from './lib/build';
import dist from './dist/build';
import { copy } from './fs-utils';
import { distRoot, bowerRoot } from './constants';
import { exec } from './exec';

function forkAndBuildDocs({verbose, useCache}) {
  console.log('Building: '.cyan + 'docs'.green);

  const verboseOption = verbose ? '--verbose' : '';
  const useCacheOption = `--use-cache=${Boolean(useCache)}`;

  return exec(`npm run docs-build -- ${verboseOption} ${useCacheOption}`)
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}

export default function Build({verbose, useCache} = {}) {
  return Promise.all([
      lib(),
      bower(),
      dist({useCache}),
      forkAndBuildDocs({verbose, useCache})
    ])
    .then(() => copy(distRoot, bowerRoot));
}
