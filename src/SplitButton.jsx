/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import Button         from './Button';
import DropdownButton from './DropdownButton';

var SplitButton = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    // TODO: Uncompatable with React 0.8.0
    //title: React.PropTypes.renderable.isRequired,
    //dropdownTitle: React.PropTypes.renderable,
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
    var classes = {};

    classes[this.state.className] = true;
    classes['btn-group'] = !this.props.isInInputGroup;
    classes['input-group-btn'] = this.props.isInInputGroup;

    if (this.props.bsVariation) {
      classes[this.props.bsVariation] = true;
    }

    return (
      <div className={classSet(classes)}>
        {this.transferPropsTo(<Button onClick={this.handleClick}>{this.props.title}</Button>)}
        {this.transferPropsTo(
          <DropdownButton
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

export default = SplitButton;