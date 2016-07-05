import omit from 'lodash-compat/object/omit';
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
    // Omit props only relevant to tab nav instead of tab pane.
    const props = omit(this.props, ['title', 'disabled', 'tabClassName']);

    return <TabPane {...props} />;
  }
}

Tab.propTypes = propTypes;

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
