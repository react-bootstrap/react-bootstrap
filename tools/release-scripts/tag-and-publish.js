import { exec, spawn } from 'child-process-promise';

export default (version) => {
  console.log('Releasing: '.cyan + 'npm module'.green);

  return exec(`git tag -a --message=v${version} v${version}`)
    .then(() => exec(`git push`))
    .then(() => exec(`git push --tags`))
    .then(() => exec('npm publish'))
    .then(() => console.log('Released: '.cyan + 'npm module'.green));
}
