/** @jsx React.DOM */

import React          from './react-es6';
import PropTypes      from './PropTypes' ;


var Row = React.createClass({
  propTypes: {
    componentClass: PropTypes.componentClass
  },

  getDefaultProps: function () {
    return {
      componentClass: React.DOM.div
    };
  },

  render: function () {
    var componentClass = this.props.componentClass;

    return this.transferPropsTo(
      <componentClass className="row">
        {this.props.children}
      </componentClass>
    );
  }
});

export default = Row;