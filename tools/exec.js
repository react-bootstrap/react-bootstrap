import { exec as processExec } from 'child-process-promise';
import 'colors';

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

export function exec(command, options = {}) {
  let proc = processExec(command, options);
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

export function safeExec(command, options = {}) {
  let title = options.title || command;

  if (executionOptions.dryRun) {
    logWithPrefix(`[${title}]`.grey, 'DRY RUN'.magenta);
    return Promise.resolve();
  }

  return exec(command, options);
}

export function setExecOptions(options) {
  executionOptions = { ...executionOptions, ...options };
}
