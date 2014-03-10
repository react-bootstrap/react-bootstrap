/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';

var Button = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    active:   React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block:    React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button',
      bsStyle: 'default',
      type: 'button'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['active'] = this.props.active;
    classes['btn-block'] = this.props.block;

    var renderFuncName = this.props.href ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function (classes) {
    classes['disabled'] = this.props.disabled;

    return this.transferPropsTo(
      <a
        className={classSet(classes)}
        role="button">
        {this.props.children}
      </a>
    );
  },

  renderButton: function (classes) {
    return this.transferPropsTo(
      <button
        className={classSet(classes)}>
        {this.props.children}
      </button>
    );
  }
});

export default = Button;