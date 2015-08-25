import React from 'react';
import deprecationWarning from './utils/deprecationWarning';
import Tab from './Tab';

const TabPane = React.createClass({
  componentWillMount() {
    deprecationWarning(
      'TabPane', 'Tab',
      'https://github.com/react-bootstrap/react-bootstrap/pull/1091'
    );
  },

  render() {
    return (
      <Tab {...this.props} />
    );
  }
});

export default TabPane;
