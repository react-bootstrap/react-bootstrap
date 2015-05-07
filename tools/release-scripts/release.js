/* eslint no-process-exit: 0 */
import yargs from 'yargs';
import { exec, safeExec, setExecOptions } from '../exec';

import preConditions from './pre-conditions';
import versionBump from './version-bump';
import addChangelog from './changelog';
import repoRelease from './repo-release';
import tagAndPublish from './tag-and-publish';
import test from './test';
import build from '../build';

import { bowerRepo, bowerRoot, tmpBowerRepo, docsRoot, docsRepo, tmpDocsRepo } from '../constants';

const yargsConf = yargs
  .usage('Usage: $0 <version> [--preid <identifier>]')
  .example('$0 minor --preid beta', 'Release with minor version bump with pre-release tag')
  .example('$0 major', 'Release with major version bump')
  .example('$0 major --dry-run', 'Release dry run with patch version bump')
  .example('$0 --preid beta', 'Release same version with pre-release bump')
  .command('patch', 'Release patch')
  .command('minor', 'Release minor')
  .command('major', 'Release major')
  .command('<version>', 'Release specific version')
  .option('preid', {
    demand: false,
    describe: 'pre-release identifier',
    type: 'string'
  })
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
  preid: argv.preid,
  type: argv._[0]
};

if (versionBumpOptions.type === undefined && versionBumpOptions.preid === undefined) {
  console.log('Must provide either a version bump type, preid, or both'.red);
  console.log(yargsConf.help());
  process.exit(1);
}

preConditions()
  .then(test)
  .then(versionBump(versionBumpOptions))
  .then(v => { version = v; })
  .then(() => addChangelog(version))
  .then(() => {
    return build(argv.verbose)
      .catch(err => {
        console.log('Build failed, reverting version bump'.red);

        return exec('git reset HEAD .')
          .then(() => exec('git checkout package.json'))
          .then(() => exec('git checkout CHANGELOG.md'))
          .then(() => console.log('Version bump reverted'.red))
          .then(() => {
            throw err;
          });
      });
  })
  .then(() => safeExec(`git commit -m "Release v${version}"`))
  .then(() => Promise.all([
    tagAndPublish(version),
    repoRelease(bowerRepo, bowerRoot, tmpBowerRepo, version),
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
