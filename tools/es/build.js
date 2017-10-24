import 'colors';
import fsp from 'fs-promise';
import { exec } from '../exec';
import { srcRoot, esRoot } from '../constants';
import buildBabel from '../buildBabel';

export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rimraf ${esRoot}`)
    .then(() => fsp.mkdirs(esRoot))
    .then(() => buildBabel(srcRoot, esRoot, {
      babelrc: false,
      presets: [
        ['env', {
          loose: true,
          modules: false,
          targets: {
            ie: 9,
            uglify: true,
          },
        }],
        'react',
      ],
      plugins: [
        'transform-class-properties',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'dev-expression',
        'transform-runtime',
        'add-module-exports',
      ],
    }))
    .then(() => console.log('Built: '.cyan + 'es module'.green));
}
