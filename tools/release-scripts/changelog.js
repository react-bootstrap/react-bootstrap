import 'colors';
import path from 'path';
import { exec, safeExec } from '../exec';

export default (repoRoot, version) => {
  return exec(`node_modules/.bin/changelog -t v${version}`)
    .then(() => safeExec(`git add ${path.join(repoRoot, 'CHANGELOG.md')}`))
    .then(() => console.log('Generated Changelog'.cyan));
};
