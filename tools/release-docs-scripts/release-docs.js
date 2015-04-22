/* eslint no-process-exit: 0 */

import 'colors';
import { exec } from 'child-process-promise';

import preConditions from '../release-scripts/pre-conditions';
import versionBump from '../release-scripts/version-bump';
import repoRelease from '../release-scripts/repo-release';
import tag from '../release-scripts/tag';
import { lint } from '../release-scripts/test';

import { repoRoot, docsRoot, docsRepo, tmpDocsRepo } from '../release-scripts/constants';

let version;

const versionBumpOptions = {
  preid: 'docs'
};

preConditions()
  .then(lint)
  .then(versionBump(repoRoot, versionBumpOptions))
  .then(v => { version = v; })
  .then(() => {
    return exec('npm run docs-build')
      .catch(err => {
        console.log('Docs-build failed, reverting version bump'.red);
        return exec('git reset HEAD .')
          .then(() => exec('git checkout package.json'))
          .then(() => console.log('Version bump reverted'.red))
          .then(() => {
            throw err;
          });
      });
  })
  .then(() => exec(`git commit -m "Release v${version}"`))
  .then(() => Promise.all([
    tag(version),
    repoRelease(docsRepo, docsRoot, tmpDocsRepo, version)
  ]))
  .then(() => console.log('Version '.cyan + `v${version}`.green + ' released!'.cyan))
  .catch(err => {
    if (!err.__handled) {
      console.error(err.message.red);
    }

    process.exit(1);
  });
