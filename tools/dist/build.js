import path from 'path';
import fsp from 'fs-promise';
import { exec, spawn } from 'child-process-promise';

const repoRoot = path.resolve(__dirname, '../../');
const dist = path.join(repoRoot, 'dist');

export default function BuildDistributable() {
  console.log('Building: '.cyan + 'distributable'.green);

  return exec(`rm -rf ${dist}`)
    .then(() => Promise.all([
      exec('webpack --bail'),
      exec('webpack --bail -p')
    ]))
    .then(() => console.log('Built: '.cyan + 'distributable'.green));
}
