import 'colors';
import { exec } from '../exec';
import { srcRoot, libRoot } from '../constants';

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${libRoot}`)
    .then(() => exec(`babel --optional es7.objectRestSpread ${srcRoot} --out-dir ${libRoot}`))
    .then(() => console.log('Built: '.cyan + 'npm module'.green));
}
