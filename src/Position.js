import deprecationWarning from './utils/deprecationWarning';
import Position from 'react-overlays/lib/Position';

export default deprecationWarning.wrapper(Position, {
  message:
    'The Position component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' +
    'You can read more at: ' +
    'http://react-bootstrap.github.io/react-overlays/examples/#position and ' +
    'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
});
