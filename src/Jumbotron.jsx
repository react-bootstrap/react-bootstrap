/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var Jumbotron = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <div className='jumbotron'>
        {this.props.children}
      </div>
    );
  }
});

export default = Jumbotron;