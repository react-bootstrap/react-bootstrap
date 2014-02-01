/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var Tab = React.createClass({
  handleClick: function () {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.id);
    }
  },

  render: function () {
    var classes = {
      'nav': true,
      'nav-tab': true,
      'active': this.props.isActive
    };

    return this.transferPropsTo(
      <li className={classSet(classes)}>
        <a
          ref="button"
          href={this.props.id ? '#' + this.props.id : null}
          onClick={this.handleClick}>
          {this.props.children}
        </a>
      </li>
    );
  }
});

export default = Tab;