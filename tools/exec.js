import 'colors';
import _ from 'lodash';
import { exec } from 'child-process-promise';

let executionOptions = {
  dryRun: false,
  verbose: false
};

function logWithPrefix(prefix, message) {
  let formattedMessage = message.trim().split('\n')
    .reduce((acc, line) => `${acc}${ acc !== '' ? '\n' : '' }${prefix} ${line}`, '');

  console.log(formattedMessage);
}

function execWrapper(command, options = {}) {
  let proc = exec(command, options);
  let title = options.title || command;
  let log = message => logWithPrefix(`[${title}]`.grey, message);

  if (executionOptions.verbose) {
    let output = (data, type) => {
      logWithPrefix(`[${title}] ${type}:`.grey, data.toString());
    };
    proc = proc.progress(({stdout, stderr}) => {
      stdout.on('data', data => output(data, 'stdout'));
      stderr.on('data', data => output(data, 'stderr'));
    })
    .then(result => {
      log('Complete'.cyan);
      return result;
    })
    .catch(err => {
      log(`ERROR: ${err.toString()}`.red);
      throw err;
    });
  }

  return proc;
}

function safeExec(command, options = {}) {
  let title = options.title || command;

  if (executionOptions.dryRun) {
    logWithPrefix(`[${title}]`.grey, 'DRY RUN'.magenta);
    return Promise.resolve();
  }

  return execWrapper(command, options);
}

function setExecOptions(options) {
  executionOptions = _.extend({}, executionOptions, options);
}

export default {
  exec: execWrapper,
  safeExec,
  setExecOptions
};
