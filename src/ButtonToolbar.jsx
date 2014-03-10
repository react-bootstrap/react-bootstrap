/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import Button         from './Button';

var ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <div
        role="toolbar"
        className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default = ButtonGroup;