import 'colors';
import path from 'path';
import fsp from 'fs-promise';
import semver from 'semver';
import { safeExec } from '../exec';
import { repoRoot } from '../constants';

export default function({ preid, type }) {
  const packagePath = path.join(repoRoot, 'package.json');

  return () => fsp.readFile(packagePath, { encoding: 'utf8' })
    .then(contents => {
      let json = JSON.parse(contents);
      let version;
      const oldVersion = json.version;

      if (type === undefined) {
        if (!preid) {
          throw new Error('Must specify version bump type');
        }

        version = oldVersion;
      } else {
        if (['major', 'minor', 'patch'].indexOf(type) === -1) {
          version = type;
        } else {
          version = semver.inc(json.version, type);
        }
      }

      if (preid) {
        version = semver.inc(version, 'pre', preid);
      }

      console.log('Version changed from '.cyan + oldVersion.green + ' to '.cyan + version.green);
      json.version = version;

      return fsp.writeFile(packagePath, JSON.stringify(json, null, 2) + '\n')
        .then(() => safeExec(`git add ${packagePath}`))
        .then(() => json.version);
    });
}
