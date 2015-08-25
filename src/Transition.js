import deprecationWarning from './utils/deprecationWarning';
import Transition from 'react-overlays/lib/Transition';

export default deprecationWarning.wrapper(Transition, {
  message:
    'The Transition component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' +
    'You can read more at: ' +
    'http://react-bootstrap.github.io/react-overlays/examples/#transition and ' +
    'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
});
