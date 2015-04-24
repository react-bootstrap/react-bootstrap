import { safeExec } from '../exec';

export default (version) => {
  console.log('Tagging: '.cyan + `v${version}`.green);

  return safeExec(`git tag -a --message=v${version} v${version}`)
    .then(() => safeExec(`git push`))
    .then(() => safeExec(`git push --tags`))
    .then(() => console.log('Tagged: '.cyan + `v${version}`.green));
};
