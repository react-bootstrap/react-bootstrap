import from 'colors';
import path from 'path';
import { exec, spawn } from 'child-process-promise';

export default (repoRoot, version) => {
  return exec(`node_modules/.bin/changelog -t v${version}`)
    .then(() => exec(`git add ${path.join(repoRoot, 'CHANGELOG.md')}`))
    .then(() => console.log('Generated Changelog'.cyan));
}
