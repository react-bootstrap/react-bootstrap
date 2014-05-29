/** @jsx React.DOM */

import React                  from './react-es6';
import ValidComponentChildren from './ValidComponentChildren';

var Badge = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <span className={ValidComponentChildren.hasValidComponent(this.props.children) ? 'badge': null}>
        {this.props.children}
      </span>
    );
  }
});

export default = Badge;