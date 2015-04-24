import 'colors';
import { exec } from '../exec';

function test() {
  console.log('Running: '.cyan + 'tests'.green);

  return exec('karma start --single-run')
    .then(() => console.log('Completed: '.cyan + 'tests'.green));
}

function lint() {
  console.log('Running: '.cyan + 'eslint'.green);

  return exec('npm run lint')
    .then(() => console.log('Completed: '.cyan + 'eslint'.green));
}

function testAndLint() {
  return Promise.all([
    test(),
    lint()
  ]);
}

export {
  testAndLint as default,
  lint
};
