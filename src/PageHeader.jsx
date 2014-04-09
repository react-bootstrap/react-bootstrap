/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var PageHeader = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <div className='page-header'>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

export default = PageHeader;