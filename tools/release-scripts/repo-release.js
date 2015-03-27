import from 'colors';
import path from 'path';
import fsp from 'fs-promise';
import { exec, spawn } from 'child-process-promise';

export default (repo, srcFolder, tmpFolder, version) => {
  console.log('Releasing: '.cyan + repo.green);

  return exec(`rm -rf ${tmpFolder}`)
    .then(() => exec(`git clone ${repo} ${tmpFolder}`))
    .then(() => fsp.readdir(tmpFolder))
    .then(files => {
      return Promise.all(
        files
          .filter(file => file !== '.git')
          .map(file => exec(`rm -rf ${path.join(tmpFolder, file)}`))
      );
    })
    .then(() => exec(`cp -R ${srcFolder} ${tmpFolder}`))
    .then(() => exec(`cp LICENSE ${tmpFolder}`))
    .then(() => exec(`cd ${tmpFolder} && git add -A .`))
    .then(() => exec(`cd ${tmpFolder} && git commmit -m "Release v${version}"`))
    .then(() => exec(`cd ${tmpFolder} && git tag -a --message=v${version} v${version}`))
    .then(() => exec(`cd ${tmpFolder} && git push`))
    .then(() => exec(`cd ${tmpFolder} && git push --tags`))
    .then(() => exec(`rm -rf ${tmpFolder}`))
    .then(() => console.log('Released: '.cyan + repo.green));
}
