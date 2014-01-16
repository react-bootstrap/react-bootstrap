/** @jsx React.DOM */

var React          = require('react');
var merge          = require('react/lib/merge');
var BootstrapMixin = require('./BootstrapMixin');
var Button         = require('./Button');
var ButtonDropdown = require('./ButtonDropdown');

var SplitButton = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    title: React.PropTypes.string,
    dropdownTitle: React.PropTypes.string,
    bsVariation: React.PropTypes.oneOf(['dropup']),
    onClick: React.PropTypes.func,
    onOptionClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  handleClick: function () {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  },

  handleOptionClick: function (key) {
    if (typeof this.props.onOptionClick === 'function') {
      this.props.onOptionClick(key);
    }
  },

  render: function () {
    var classes = {
      'btn-group': true
    };

    if (this.props.bsVariation) {
      classes[this.props.bsVariation] = true;
    }

    var className = React.addons.classSet(classes);

    return (
      <div className={className}>
        {this.transferPropsTo(<Button onClick={this.handleClick}>{this.props.title}</Button>)}
        {this.transferPropsTo(
          <ButtonDropdown title={this.props.dropdownTitle} isTitleHidden={true} onClick={this.handleOptionClick} />
        )}
      </div>
    );
  }
});

module.exports = SplitButton;