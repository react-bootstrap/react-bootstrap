import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';

import ValidComponentChildren from './utils/ValidComponentChildren';
import Nav from './Nav';
import NavItem from './NavItem';

let panelId = (props, child) => child.props.id ? child.props.id : props.id && (props.id + '___panel___' + child.props.eventKey);
let tabId = (props, child) => child.props.id ? child.props.id + '___tab' : props.id && (props.id + '___tab___' + child.props.eventKey);

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

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      // check if the 'previousActiveKey' child still exists
      let previousActiveKey = this.props.activeKey;
      React.Children.forEach(nextProps.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.eventKey === previousActiveKey) {
            this.setState({
              previousActiveKey
            });
            return;
          }
        }
      });

      // if the 'previousActiveKey' child does not exist anymore
      this.setState({
        previousActiveKey: null
      });
    }
  },

  handlePaneAnimateOutEnd() {
    this.setState({
      previousActiveKey: null
    });
  },

  render() {
    let { id, ...props } = this.props;

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    let nav = (
      <Nav {...props} activeKey={this.getActiveKey()} onSelect={this.handleSelect} ref="tabs">
        {ValidComponentChildren.map(this.props.children, renderTabIfSet, this)}
      </Nav>
    );

    return (
      <div>
        {nav}
        <div id={id} className="tab-content" ref="panes">
          {ValidComponentChildren.map(this.props.children, this.renderPane)}
        </div>
      </div>
    );
  },

  getActiveKey() {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane(child, index) {
    let previousActiveKey = this.state.previousActiveKey;

    let shouldPaneBeSetActive = child.props.eventKey === this.getActiveKey();
    let thereIsNoActivePane = previousActiveKey == null;

    let paneIsAlreadyActive = previousActiveKey != null && child.props.eventKey === previousActiveKey;

    return cloneElement(
        child,
        {
          active: shouldPaneBeSetActive && (thereIsNoActivePane || !this.props.animation),
          id: panelId(this.props, child),
          'aria-labelledby': tabId(this.props, child),
          key: child.key ? child.key : index,
          animation: this.props.animation,
          onAnimateOutEnd: paneIsAlreadyActive ? this.handlePaneAnimateOutEnd : null
        }
      );
  },

  renderTab(child) {
    let {eventKey, className, tab, disabled } = child.props;

    return (
      <NavItem
        linkId={tabId(this.props, child)}
        ref={'tab' + eventKey}
        aria-controls={panelId(this.props, child)}
        eventKey={eventKey}
        className={className}
        disabled={disabled}>
        {tab}
      </NavItem>
    );
  },

  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect(selectedKey) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(selectedKey);
      this._isChanging = false;
      return;
    }

    // if there is no external handler, then use embedded one
    let previousActiveKey = this.getActiveKey();
    if (selectedKey !== previousActiveKey) {
      this.setState({
        activeKey: selectedKey,
        previousActiveKey
      });
    }
  }
});

export default TabbedArea;
