import from 'colors';
import { exec, spawn } from 'child-process-promise';

function ensureClean() {
  return exec('git diff-index --name-only HEAD --')
    .then(result => {
      if (result.stdout.length) {
        throw new Error('Git repository must be clean');
      }
      console.info('No pending changes'.cyan);
    });
}

function ensureFetched() {
  return exec('git fetch')
    .then(result => {
      if (/\[behind (.*)\]/.test(result.stdout)) {
        throw new Error('Your repo is behind by ' + RegExp.$1 + ' commits');
      }
      console.info('Current with latest changes from remote'.cyan);
    });
}

export default function ReleasePreConditions() {
  return ensureClean().then(ensureFetched);
}
