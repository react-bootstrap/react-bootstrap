import React from 'react';
import CollapsibleNav from './CollapsibleNav';
import deprecationWarning from './utils/deprecationWarning';

const deprecationLink = 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963';

const CollapsableNav = React.createClass({
  getCollapsableDOMNode() {
    return this.refs.collapsible.getCollapsableDOMNode();
  },

  getCollapsableDimensionValue() {
    return this.refs.collapsible.getCollapsableDimensionValue();
  },

  componentDidMount() {
    deprecationWarning(
      'CollapsableNav',
      'CollapsibleNav',
      deprecationLink
    );
  },

  render() {
    return (<CollapsibleNav {...this.props} ref="collapsible" />);
  },

  getChildActiveProp(child) {
    return this.refs.collapsible.getChildActiveProp(child);
  }
});

export default CollapsableNav;
