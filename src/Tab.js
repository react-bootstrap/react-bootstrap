import React from 'react';
import TabPane from './TabPane';

const Tab = React.createClass({
  propTypes: {
    ...TabPane.propTypes,
    disabled: React.PropTypes.bool,
    title: React.PropTypes.node,
    /**
     * tabClassName is used as className for the associated NavItem
     */
    tabClassName: React.PropTypes.string
  },

  render() {
    return (
      <TabPane {...this.props}
        title={undefined}
        tabClassName={undefined}
      >
        {this.props.children}
      </TabPane>
    );
  }
});

export default Tab;
