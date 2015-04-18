import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';

import ValidComponentChildren from './utils/ValidComponentChildren';
import Nav from './Nav';
import NavItem from './NavItem';

function getDefaultActiveKeyFromChildren(children) {
  let defaultActiveKey;

  ValidComponentChildren.forEach(children, function(child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

const TabbedArea = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),
    animation: React.PropTypes.bool,
    id: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      bsStyle: 'tabs',
      animation: true
    };
  },

  getInitialState() {
    let defaultActiveKey = this.props.defaultActiveKey != null ?
      this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

    // TODO: In __DEV__ mode warn via `console.warn` if no `defaultActiveKey` has
    // been set by this point, invalid children or missing key properties are likely the cause.

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },

  handlePaneAnimateOutEnd() {
    this.setState({
      previousActiveKey: null
    });
  },

  render() {
    let activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    let nav = (
      <Nav {...this.props} activeKey={activeKey} onSelect={this.handleSelect} ref="tabs">
        {ValidComponentChildren.map(this.props.children, renderTabIfSet, this)}
      </Nav>
    );

    return (
      <div>
        {nav}
        <div id={this.props.id} className="tab-content" ref="panes">
          {ValidComponentChildren.map(this.props.children, this.renderPane)}
        </div>
      </div>
    );
  },

  getActiveKey() {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane(child, index) {
    let activeKey = this.getActiveKey();

    return cloneElement(
        child,
        {
          active: (child.props.eventKey === activeKey &&
            (this.state.previousActiveKey == null || !this.props.animation)),
          key: child.key ? child.key : index,
          animation: this.props.animation,
          onAnimateOutEnd: (this.state.previousActiveKey != null &&
            child.props.eventKey === this.state.previousActiveKey) ? this.handlePaneAnimateOutEnd: null
        }
      );
  },

  renderTab(child) {
    let key = child.props.eventKey;
    return (
      <NavItem
        ref={'tab' + key}
        eventKey={key}>
        {child.props.tab}
      </NavItem>
    );
  },

  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect(key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    } else if (key !== this.getActiveKey()) {
      this.setState({
        activeKey: key,
        previousActiveKey: this.getActiveKey()
      });
    }
  }
});

export default TabbedArea;
