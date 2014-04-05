/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var Badge = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <span className='badge'>
        {this.props.children}
      </span>
    );
  }
});

export default = Badge;