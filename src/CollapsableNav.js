import React from 'react';
import deprecationWarning from './utils/deprecationWarning';
import assign from './utils/Object.assign';
import {specCollapsibleNav} from './CollapsibleNav';

const specCollapsableNav = assign({}, specCollapsibleNav, {
  componentDidMount() {
    deprecationWarning(
      'CollapsableNav',
      'CollapsibleNav',
      'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963'
    );
  }
});

const CollapsableNav = React.createClass(specCollapsableNav);

export default CollapsableNav;
