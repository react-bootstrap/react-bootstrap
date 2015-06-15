import { exec } from '../exec';
import { distRoot } from '../constants';

export default function BuildDistributable({useCache}) {
  console.log('Building: '.cyan + 'distributable'.green);

  const useCacheOption = `--use-cache=${Boolean(useCache)}`;

  return exec(`rimraf ${distRoot}`)
    .then(() => Promise.all([
      exec(`webpack ${useCacheOption} --bail`),
      exec(`webpack ${useCacheOption} --bail -p`)
    ]))
    .then(() => console.log('Built: '.cyan + 'distributable'.green));
}
