import from 'colors';
import path from 'path';
import fsp from 'fs-promise';
import { exec, spawn } from 'child-process-promise';
import { copy } from '../fs-utils';

const repoRoot = path.resolve(__dirname, '../../');

const license = path.join(repoRoot, 'LICENSE');

export default (repo, srcFolder, tmpFolder, version) => {
  console.log('Releasing: '.cyan + repo.green);

  return exec(`rimraf ${tmpFolder}`)
    .then(() => exec(`git clone ${repo} ${tmpFolder}`))
    .then(() => fsp.readdir(tmpFolder))
    .then(files => {
      return Promise.all(
        files
          .filter(file => file !== '.git')
          .map(file => exec(`rimraf ${path.join(tmpFolder, file)}`))
      );
    })
    .then(() => copy(srcFolder, tmpFolder))
    .then(() => copy(license, tmpFolder))
    .then(() => exec(`cd ${tmpFolder} && git add -A .`))
    .then(() => exec(`cd ${tmpFolder} && git commmit -m "Release v${version}"`))
    .then(() => exec(`cd ${tmpFolder} && git tag -a --message=v${version} v${version}`))
    .then(() => exec(`cd ${tmpFolder} && git push`))
    .then(() => exec(`cd ${tmpFolder} && git push --tags`))
    .then(() => exec(`rimraf ${tmpFolder}`))
    .then(() => console.log('Released: '.cyan + repo.green));
}
