/* eslint no-process-exit: 0 */

import from 'colors';
import bower from './amd/build';
import lib from './lib/build';
import docs from '../docs/build';
import dist from './dist/build';
import { exec, spawn } from 'child-process-promise';

import yargs from 'yargs';

const argv = yargs
  .option('docs-only', {
    demand: false,
    default: false
  })
  .argv;

export default function Build(noExitOnFailure) {
  if (argv.docsOnly) {
    return docs();
  } else {
    let result = Promise.all([
      lib(),
      bower(),
      dist(),
      docs()
    ])
    .then(() => exec(`cp -R dist/ amd`));

    if (!noExitOnFailure) {
      result = result
        .catch(err => {
          console.error(err.toString().red);
          process.exit(1);
        });
    }

    return result;
  }
}

