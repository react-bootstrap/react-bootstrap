/* eslint no-process-exit: 0 */

import 'colors';
import bower from './amd/build';
import lib from './lib/build';
import docs from '../docs/build';
import dist from './dist/build';
import { copy } from './fs-utils';
import { distRoot, bowerRoot } from './constants';
import { exec, setExecOptions } from './exec';

import yargs from 'yargs';

const argv = yargs
  .option('docs-only', {
    demand: false,
    default: false
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  })
  .argv;

setExecOptions(argv);

export default function Build(noExitOnFailure) {
  if (argv.docsOnly) {
    return docs();
  } else {
    let result = Promise.all([
      lib(),
      bower(),
      dist(),
      exec(`npm run docs-build`)
    ])
    .then(() => copy(distRoot, bowerRoot));

    if (!noExitOnFailure) {
      result = result
        .catch(err => {
          console.error(err.toString().red);
          if (err.stack) {
            console.error(err.stack.red);
          }
          process.exit(1);
        });
    }

    return result;
  }
}
