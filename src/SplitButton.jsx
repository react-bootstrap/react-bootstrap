/** @jsx React.DOM */

var React          = require('react');
var merge          = require('react/lib/merge');
var BootstrapMixin = require('./BootstrapMixin');
var Button         = require('./Button');
var ButtonDropdown = require('./ButtonDropdown');

var SplitButton = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    title: React.PropTypes.renderable.isRequired,
    dropdownTitle: React.PropTypes.renderable,
    bsVariation: React.PropTypes.oneOf(['dropup']),
    isInInputGroup: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onOptionClick: React.PropTypes.func,
    options: React.PropTypes.array
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
    var classes = this.getClassSetFromClassName();

    classes['btn-group'] = !this.props.isInInputGroup;
    classes['input-group-btn'] = this.props.isInInputGroup;

    if (this.props.bsVariation) {
      classes[this.props.bsVariation] = true;
    }

    var className = React.addons.classSet(classes);

    return (
      <div className={className}>
        {this.transferPropsTo(<Button onClick={this.handleClick}>{this.props.title}</Button>)}
        {this.transferPropsTo(
          <ButtonDropdown
            title={this.props.dropdownTitle}
            isTitleHidden={true}
            onClick={this.handleOptionClick}
            options={this.props.options}
          />
        )}
      </div>
    );
  }
});

module.exports = SplitButton;