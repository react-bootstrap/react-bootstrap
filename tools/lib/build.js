import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, libRoot } from '../constants';
import { buildFolder } from '../buildBabel';

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${libRoot}`)
    .then(() => fsp.mkdirs(libRoot))
    .then(() => buildFolder(srcRoot, libRoot))
    .then(() => console.log('Built: '.cyan + 'npm module'.green));
}
