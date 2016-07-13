import React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

const propTypes = {
  ...TabPane.propTypes,

  disabled: React.PropTypes.bool,

  title: React.PropTypes.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: React.PropTypes.string
};

class Tab extends React.Component {
  render() {
    const props = { ...this.props };

    // These props are for the parent `<Tabs>` rather than the `<TabPane>`.
    delete props.title;
    delete props.disabled;
    delete props.tabClassName;

    return <TabPane {...props} />;
  }
}

Tab.propTypes = propTypes;

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
