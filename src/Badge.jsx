/** @jsx React.DOM */

import React          from './react-es6';

var Badge = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <span className={this.props.children ? 'badge': null}>
        {this.props.children}
      </span>
    );
  }
});

export default = Badge;