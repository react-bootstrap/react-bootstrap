/** @jsx React.DOM */

var React             = require('react');
var classSet          = require('react/lib/cx');
import BootstrapMixin from './BootstrapMixin';

var Button = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    loadingChildren: React.PropTypes.renderable,
    isLoading:   React.PropTypes.bool,
    isActive:    React.PropTypes.bool,
    isDisabled:    React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button',
      loadingChildren: 'Loading...'
    };
  },

  renderAnchor: function (children, classes, isDisabled) {
    return this.transferPropsTo(
      <a
        href={this.props.href}
        className={classSet(classes)}
        onClick={this.props.onClick}
        disabled={isDisabled}>
        {children}
      </a>
    );
  },

  renderButton: function (children, classes, isDisabled) {
    return this.transferPropsTo(
      <button
        type={this.props.type || "button"}
        className={classSet(classes)}
        onClick={this.props.onClick}
        disabled={isDisabled}>
        {children}
      </button>
    );
  },

  render: function () {
    var isDisabled = !!(this.props.isDisabled || this.props.isLoading);

    var classes = this.getBsClassSet();
    classes['disabled'] = isDisabled;
    classes['active'] = this.props.isActive;

    var children = this.props.isLoading ?
      this.props.loadingChildren : this.props.children;

    var renderFuncName = (this.props.href) ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](children, classes, isDisabled);
  }
});

export default = Button;