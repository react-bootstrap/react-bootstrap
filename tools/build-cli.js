/* eslint no-process-exit: 0 */

import 'colors';
import build from './build';
import docs from '../docs/build';
import lib from './lib/build';
import { setExecOptions } from './exec';

import yargs from 'yargs';

const argv = yargs
  .help('h')
  .option('docs-only', {
    demand: false,
    default: false
  })
  .option('lib-only', {
    demand: false,
    default: false,
    describe: 'Used for factories testing'
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  })
  .option('dev', {
    demand: false,
    default: false,
    describe: 'Only used when supplied with the --docs-only flag'
  })
  .argv;

setExecOptions(argv);

let buildProcess;

if (argv.libOnly) {
  buildProcess = lib(argv);
} else if (argv.docsOnly) {
  buildProcess = docs(argv);
} else {
  buildProcess = build(argv);
}

buildProcess
  .catch(err => {
    if (err.stack) {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    process.exit(1);
  });
