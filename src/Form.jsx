/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';


var Form = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    navbar: React.PropTypes.bool,
    align: React.PropTypes.oneOf(['left','right']),
    role: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      navbar: false,
      align: 'left',
      role: 'form'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['navbar-form'] = this.props.navbar;
    if (this.props.align === 'right') {
      classes['navbar-right'] = true;
    } else {
      classes['navbar-left'] = true;
    }

    return (
      <form className={classSet(classes)} role={this.props.role}>
        {this.props.children}
      </form>
    );
  }
});


export default = Form;