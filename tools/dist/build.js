import { exec } from '../exec';
import { distRoot } from '../constants';

export default function BuildDistributable() {
  console.log('Building: '.cyan + 'distributable'.green);

  return exec(`rimraf ${distRoot}`)
    .then(() => Promise.all([
      exec(`webpack --bail`),
      exec(`webpack --bail -p`)
    ]))
    .then(() => console.log('Built: '.cyan + 'distributable'.green));
}
