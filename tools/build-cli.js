/* eslint no-process-exit: 0 */

import 'colors';
import build from './build';
import docs from '../docs/build';
import { setExecOptions } from './exec';

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
  .option('dev', {
    demand: false,
    default: false,
    describe: 'Only used when supplied with the --docs-only flag'
  })
  .argv;

setExecOptions(argv);

let buildProcess = argv.docsOnly ? docs(argv) : build();

buildProcess
  .catch(err => {
    console.error(err.toString().red);
    if (err.stack) {
      console.error(err.stack.red);
    }
    process.exit(1);
  });
