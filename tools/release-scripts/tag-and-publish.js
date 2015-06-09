import 'colors';
import { safeExec } from '../exec';
import semver from 'semver';
import tag from './tag';

export default (version) => {
  console.log('Releasing: '.cyan + 'npm module'.green);
  let parsed = semver.parse(version);
  let additionalPublishArgs = '';

  if (parsed.prerelease.length > 0) {
    additionalPublishArgs = `--tag ${parsed.prerelease[0]}`;
  }

  return tag(version)
    .then(() => safeExec(`npm publish ${additionalPublishArgs}`))
    .then(() => console.log('Released: '.cyan + 'npm module'.green));
};
