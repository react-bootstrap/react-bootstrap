/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var TabPane = React.createClass({
  render: function () {
    var classes = {
      'tab-pane': true,
      'active': this.props.active
    };

    return this.transferPropsTo(
      <div className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default = TabPane;