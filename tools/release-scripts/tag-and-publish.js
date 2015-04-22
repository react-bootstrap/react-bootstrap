import { exec } from 'child-process-promise';
import tag from './tag';

export default (version) => {
  console.log('Releasing: '.cyan + 'npm module'.green);

  return tag()
    .then(() => exec('npm publish'))
    .then(() => console.log('Released: '.cyan + 'npm module'.green));
};
