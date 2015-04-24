import 'colors';
import path from 'path';
import fsp from 'fs-promise';
import { exec, safeExec } from '../exec';
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
    .then(() => safeExec(`cd ${tmpFolder} && git add -A .`))
    .then(() => safeExec(`cd ${tmpFolder} && git commmit -m "Release v${version}"`))
    .then(() => safeExec(`cd ${tmpFolder} && git tag -a --message=v${version} v${version}`))
    .then(() => safeExec(`cd ${tmpFolder} && git push`))
    .then(() => safeExec(`cd ${tmpFolder} && git push --tags`))
    .then(() => safeExec(`rimraf ${tmpFolder}`))
    .then(() => console.log('Released: '.cyan + repo.green));
};
