/* eslint no-process-exit: 0 */

import 'colors';
import yargs from 'yargs';
import { exec, safeExec, setExecOptions } from '../exec';

import preConditions from '../release-scripts/pre-conditions';
import versionBump from '../release-scripts/version-bump';
import repoRelease from '../release-scripts/repo-release';
import tag from '../release-scripts/tag';
import { lint } from '../release-scripts/test';

import { docsRoot, docsRepo, tmpDocsRepo } from '../constants';

const yargsConf = yargs
  .usage('Usage: $0 [-n|--dry-run] [--verbose]')
  .option('dry-run', {
    alias: 'n',
    demand: false,
    default: false,
    describe: 'Execute command in dry run mode. Will not commit, tag, push, or publish anything. Userful for testing.'
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  });

const argv = yargsConf.argv;
setExecOptions(argv);

let version;

const versionBumpOptions = {
  preid: 'docs'
};

preConditions()
  .then(lint)
  .then(versionBump(versionBumpOptions))
  .then(v => { version = v; })
  .then(() => {
    return exec(`npm run docs-build${ argv.verbose ? ' -- --verbose' : '' }`)
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
  .then(() => safeExec(`git commit -m "Release v${version}"`))
  .then(() => Promise.all([
    tag(version),
    repoRelease(docsRepo, docsRoot, tmpDocsRepo, version)
  ]))
  .then(() => console.log('Version '.cyan + `v${version}`.green + ' released!'.cyan))
  .catch(err => {
    if (!err.__handled) {
      if (argv.verbose) {
        console.error(err.stack.red);
      } else {
        console.error(err.toString().red);
      }
    }

    process.exit(1);
  });
