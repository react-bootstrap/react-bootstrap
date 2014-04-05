/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';

var Glyphicon = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'glyphicon'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <span className={classSet(classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default = Glyphicon;