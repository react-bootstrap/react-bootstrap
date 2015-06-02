import 'colors';
import { exec, safeExec } from '../exec';
import { changelog, alphaChangelog } from '../constants';
import semver from 'semver';


export default (version) => {
  let isPrerelease = semver.parse(version).prerelease.length > 0;
  let result = Promise.resolve();
  let output = isPrerelease ? alphaChangelog : changelog;
  let additionalArgs = '';

  if (!isPrerelease) {
    result = exec(`rimraf ${alphaChangelog}`);
    additionalArgs = ' --exclude-pre-releases';
  }

  return result
    .then(() => exec(`node_modules/.bin/changelog --title v${version} --out ${output}${additionalArgs}`))
    .then(() => safeExec(`git add -A ${changelog} ${alphaChangelog}`))
    .then(() => console.log('Generated Changelog'.cyan));
};
