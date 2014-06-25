/** @jsx React.DOM */

import React                  from './react-es6';
import utils                  from './utils';
import ValidComponentChildren from './ValidComponentChildren';

var Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    return this.transferPropsTo(
      <ul
        className="pager">
        {ValidComponentChildren.map(this.props.children, this.renderPageItem)}
      </ul>
    );
  },

  renderPageItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.props.ref,
        key: child.props.key
      }
    );
  }
});

export default = Pager;