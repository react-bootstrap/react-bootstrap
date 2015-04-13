import from 'colors';
import path from 'path';
import { exec } from 'child-process-promise';

const repoRoot = path.resolve(__dirname, '../../');
const lib = path.join(repoRoot, 'lib');
const src = path.join(repoRoot, 'src');

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${lib}`)
    .then(() => exec(`babel --optional es7.objectRestSpread ${src} --out-dir ${lib}`))
    .then(() => console.log('Built: '.cyan + 'npm module'.green));
}
