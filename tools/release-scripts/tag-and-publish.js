import { safeExec } from '../exec';
import tag from './tag';

export default (version) => {
  console.log('Releasing: '.cyan + 'npm module'.green);

  return tag(version)
    .then(() => safeExec('npm publish'))
    .then(() => console.log('Released: '.cyan + 'npm module'.green));
};
