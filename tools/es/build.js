import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, esRoot } from '../constants';
import buildBabel from '../buildBabel';

export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rimraf ${esRoot}`)
    .then(() => fsp.mkdirs(esRoot))
    .then(() => buildBabel(srcRoot, esRoot, {
      babelrc: false,
      presets: ['es2015-webpack-loose', 'react', 'stage-1'],
      plugins: [
        'transform-runtime',
        'transform-es3-member-expression-literals',
        'transform-es3-property-literals'
      ]
    }))
    .then(() => console.log('Built: '.cyan + 'es module'.green));
}
