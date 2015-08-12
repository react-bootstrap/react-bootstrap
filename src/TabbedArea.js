import React from 'react';
import Tabs from './Tabs';
import TabPane from './TabPane';
import ValidComponentChildren from './utils/ValidComponentChildren';
import deprecationWarning from './utils/deprecationWarning';

const TabbedArea = React.createClass({
  componentWillMount() {
    deprecationWarning(
      'TabbedArea', 'Tabs',
      'https://github.com/react-bootstrap/react-bootstrap/pull/1091'
    );
  },

  render() {
    const {children, ...props} = this.props;

    const tabs = ValidComponentChildren.map(children, function (child) {
      const {tab: title, ...others} = child.props;
      return <TabPane title={title} {...others} />;
    });

    return (
      <Tabs {...props}>{tabs}</Tabs>
    );
  }
});

export default TabbedArea;
