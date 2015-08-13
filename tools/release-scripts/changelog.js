import 'colors';
import fsp from 'fs-promise';
import { exec, safeExec } from '../exec';
import { changelog, alphaChangelog } from '../constants';
import semver from 'semver';


export default (version) => {
  let isPrerelease = semver.parse(version).prerelease.length > 0;
  let result = Promise.resolve();
  let output = isPrerelease ? alphaChangelog : changelog;
  let additionalArgs = '';
  let removedAlphaChangelog = false;

  if (!isPrerelease) {
    result = fsp.exists(alphaChangelog)
      .then(exists => {
        if (!exists) {
          return null;
        }

        removedAlphaChangelog = true;
        return exec(`rimraf ${alphaChangelog}`);
      });
    additionalArgs = ' --exclude-pre-releases';
  }

  return result
    .then(() => exec(`changelog --title v${version} --out ${output}${additionalArgs}`))
    .then(() => safeExec(`git add ${changelog}`))
    .then(() => {
      if (removedAlphaChangelog || isPrerelease) {
        return safeExec(`git add -A ${alphaChangelog}`);
      }
    })
    .then(() => console.log('Generated Changelog'.cyan));
};
