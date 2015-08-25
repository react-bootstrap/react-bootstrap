import deprecationWarning from './utils/deprecationWarning';
import Portal from 'react-overlays/lib/Portal';

export default deprecationWarning.wrapper(Portal, {
  message:
    'The Portal component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' +
    'You can read more at: ' +
    'http://react-bootstrap.github.io/react-overlays/examples/#portal and ' +
    'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
});

