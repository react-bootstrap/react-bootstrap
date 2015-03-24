var React = require('react');
var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');
var classSet = require('classnames');
var domUtils = require('./utils/domUtils');
var cloneElement = React.cloneElement;

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');


var CollapsableNav = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any
  },

  getCollapsableDOMNode: function () {
    return this.getDOMNode();
  },

  getCollapsableDimensionValue: function () {
    var height = 0;
    var nodes = this.refs;
    for (var key in nodes) {
      if (nodes.hasOwnProperty(key)) {

        var n = nodes[key].getDOMNode()
          , h = n.offsetHeight
          , computedStyles = domUtils.getComputedStyles(n);

        height += (h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10));
      }
    }
    return height;
  },

  render: function () {
    /*
     * this.props.collapsable is set in NavBar when a eventKey is supplied.
     */
    var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};
    /*
     * prevent duplicating navbar-collapse call if passed as prop. kind of overkill... good cadidate to have check implemented as a util that can
     * also be used elsewhere.
     */
    if (this.props.className == undefined || this.props.className.split(" ").indexOf('navbar-collapse') == -1)
      classes['navbar-collapse'] = this.props.collapsable;

    return (
      <div eventKey={this.props.eventKey} className={classSet(this.props.className, classes)} >
        {ValidComponentChildren.map(this.props.children, this.props.collapsable ? this.renderCollapsableNavChildren : this.renderChildren )}
      </div>
    );
  },

  getChildActiveProp: function (child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey == this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderChildren: function (child, index) {
    var key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: 'nocollapse_' + key,
        key: key,
        navItem: true
      }
    );
  },

  renderCollapsableNavChildren: function (child, index) {
    var key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: 'collapsable_' + key,
        key: key,
        navItem: true
      }
    );
  }
});

module.exports = CollapsableNav;
