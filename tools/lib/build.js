import 'colors';
import { exec } from '../exec';
import path from 'path';
import fsp from 'fs-promise';
import { srcRoot, libRoot } from '../constants';
import generateFactories from '../generateFactories';

const factoryDestination = path.join(libRoot, 'factories');

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${libRoot}`)
    .then(() => fsp.mkdirs(factoryDestination))
    .then(() => Promise.all([
      generateFactories(factoryDestination),
      exec(`babel ${srcRoot} --out-dir ${libRoot}`)
    ]))
    .then(() => console.log('Built: '.cyan + 'npm module'.green));
}
