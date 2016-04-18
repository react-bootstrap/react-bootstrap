import React from 'react';
import TabPane from './TabPane';
import TabContainer from './TabContainer';
import TabContent from './TabContent';

class Tab extends React.Component {
  render() {
    let { title, disabled, tabClassName, ...props } = this.props;
    return <TabPane {...props}/>;
  }
}

Tab.propTypes = {
  ...TabPane.propTypes,

  disabled: React.PropTypes.bool,

  title: React.PropTypes.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: React.PropTypes.string
};

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;
