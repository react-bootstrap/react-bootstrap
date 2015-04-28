import deprecationWarning from './utils/deprecationWarning';
import CollapsibleNav from './CollapsibleNav';

let CollapsableNav = CollapsibleNav;

deprecationWarning(
  'CollapsableNav',
  'CollapsibleNav',
  'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963'
);

export default CollapsableNav;
