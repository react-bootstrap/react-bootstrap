/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';

var Well = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'well'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <div className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default = Well;