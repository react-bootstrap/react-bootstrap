/* eslint no-process-exit: 0 */
import 'colors';
import yargs from 'yargs';
import { exec, safeExec, setExecOptions } from '../exec';

import preConditions from './pre-conditions';
import versionBump from './version-bump';
import addChangelog from './changelog';
import repoRelease from './repo-release';
import tag from './tag';
import tagAndPublish from './tag-and-publish';
import test, { lint } from '../release-scripts/test';
import build from '../build';

import { bowerRepo, bowerRoot, tmpBowerRepo, docsRoot, docsRepo, tmpDocsRepo } from '../constants';

const yargsConf = yargs
  .usage('Usage: $0 <version> [--preid <identifier>]\nor\nUsage: $0 --docs')
  .help('h')
  .example('$0 --docs', 'Release only docs')
  .example('$0 minor --preid beta', 'Release with minor version bump with pre-release tag')
  .example('$0 major', 'Release with major version bump')
  .example('$0 major --dry-run', 'Release dry run with patch version bump')
  .example('$0 --preid beta', 'Release same version with pre-release bump')
  .command('patch', 'Release patch')
  .command('minor', 'Release minor')
  .command('major', 'Release major')
  .command('<version>', 'Release specific version')
  .option('docs', {
    demand: false,
    describe: 'Release only docs'
  })
  .option('preid', {
    demand: false,
    describe: 'pre-release identifier',
    type: 'string'
  })
  .option('dry-run', {
    alias: 'n',
    demand: false,
    default: false,
    describe: 'Execute command in dry run mode. Will not commit, tag, push, or publish anything. Useful for testing.'
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  });

const argv = yargsConf.argv;
setExecOptions(argv);

if (argv.dryRun) {
  console.log('DRY RUN'.magenta);
}

let version;

const versionBumpOptions = {
  preid: argv.docs ? 'docs' : argv.preid,
  type: argv._[0]
};

if (!argv.docs && versionBumpOptions.type === undefined && versionBumpOptions.preid === undefined) {
  console.log('Must provide either --docs or a version bump type, preid (or both)'.red);
  console.log(yargsConf.help());
  process.exit(1);
}

function tagAndRelease() {
  if (argv.docs) {
    return Promise.all([
      tag(version),
      repoRelease(docsRepo, docsRoot, tmpDocsRepo, version)
    ]);
  } else {
    let releases = [
      tagAndPublish(version),
      repoRelease(bowerRepo, bowerRoot, tmpBowerRepo, version)
    ];

    if (!argv.preid) {
      releases.push(repoRelease(docsRepo, docsRoot, tmpDocsRepo, version));
    }

    return Promise.all(releases);
  }
}

function prepareRepo() {
  if (argv.docs) {
    return exec(`npm run docs-build${ argv.verbose ? ' -- --verbose' : '' }`);
  } else {
    return build(argv.verbose).then(() => addChangelog(version));
  }
}

function revertAndThrow(err) {
  console.log('Build failed, reverting version bump'.red);

  return exec('git reset HEAD .')
    .then(() => exec('git checkout package.json'))
    .then(() => console.log('Version bump reverted'.red))
    .then(() => { throw err; });
}

preConditions()
  .then(argv.docs ? lint : test)
  .then(versionBump(versionBumpOptions))
  .then(v => { version = v; })
  .then(() => prepareRepo().catch(err => revertAndThrow(err)))
  .then(() => safeExec(`git commit -m "Release v${version}"`))
  .then(tagAndRelease)
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
