/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import Button         from './Button';

var ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button-group'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return this.transferPropsTo(
      <div
        className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default = ButtonGroup;