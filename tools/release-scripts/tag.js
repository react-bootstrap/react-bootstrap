import { exec } from 'child-process-promise';

export default (version) => {
  console.log('Tagging: '.cyan + `v${version}`.green);

  return exec(`git tag -a --message=v${version} v${version}`)
    .then(() => exec(`git push`))
    .then(() => exec(`git push --tags`))
    .then(() => console.log('Tagged: '.cyan + `v${version}`.green));
};
