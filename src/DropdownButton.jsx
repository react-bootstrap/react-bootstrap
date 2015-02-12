var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var createChainedFunction = require('./utils/createChainedFunction');
var BootstrapMixin = require('./BootstrapMixin');
var DropdownStateMixin = require('./DropdownStateMixin');
var Button = require('./Button');
var ButtonGroup = require('./ButtonGroup');
var DropdownMenu = require('./DropdownMenu');
var ValidComponentChildren = require('./utils/ValidComponentChildren');


var DropdownButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup:    React.PropTypes.bool,
    title:     React.PropTypes.node,
    href:      React.PropTypes.string,
    onClick:   React.PropTypes.func,
    onSelect:  React.PropTypes.func,
    navItem:   React.PropTypes.bool,
    noCaret:   React.PropTypes.bool
  },

  render: function () {
    var renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    var caret = this.props.noCaret ?
        null : (<span className="caret" />);

    return this[renderMethod]([
      <Button
        {...this.props}
        ref="dropdownButton"
        className="dropdown-toggle"
        onClick={this.handleDropdownClick}
        key={0}
        navDropdown={this.props.navItem}
        navItem={null}
        title={null}
        pullRight={null}
        dropup={null}>
        {this.props.title}{' '}
        {caret}
      </Button>,
      <DropdownMenu
        ref="menu"
        aria-labelledby={this.props.id}
        pullRight={this.props.pullRight}
        key={1}>
        {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
      </DropdownMenu>
    ]);
  },

  renderButtonGroup: function (children) {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={joinClasses(this.props.className, classSet(groupClasses))}>
        {children}
      </ButtonGroup>
    );
  },

  renderNavItem: function (children) {
    var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <li className={joinClasses(this.props.className, classSet(classes))}>
        {children}
      </li>
    );
  },

  renderMenuItem: function (child, index) {
    // Only handle the option selection if an onSelect prop has been set on the
    // component or it's child, this allows a user not to pass an onSelect
    // handler and have the browser preform the default action.
    var handleOptionSelect = this.props.onSelect || child.props.onSelect ?
      this.handleOptionSelect : null;

    return cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index,
        ref: child.ref
      }
    );
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

module.exports = DropdownButton;
