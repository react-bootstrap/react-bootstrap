import 'colors';
import _ from 'lodash';
import { exec } from 'child-process-promise';

let executionOptions = {
  dryRun: false,
  verbose: false
};

function logWithPrefix(prefix, message) {
  console.log(
    message.toString().trim()
    .split('\n')
    .map((line) => `${prefix.grey} ${line}`)
    .join('\n')
  );
}

function execWrapper(command, options = {}) {
  let proc = exec(command, options);
  if (!executionOptions.verbose) {
    return proc;
  }

  let title = options.title || command;
  let output = (data, type) => logWithPrefix(`[${title}] ${type}:`, data);

  return proc.progress(({stdout, stderr}) => {
    stdout.on('data', data => output(data, 'stdout'));
    stderr.on('data', data => output(data, 'stderr'));
  })
  .then(result => {
    logWithPrefix(`[${title}]`, 'Complete'.cyan);
    return result;
  });
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
