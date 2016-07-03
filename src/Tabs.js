import React, { cloneElement } from 'react';
import requiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

import Nav from './Nav';
import NavItem from './NavItem';
import styleMaps from './styleMaps';
import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';
import ValidComponentChildren from './utils/ValidComponentChildren';

const TabContainer = UncontrolledTabContainer.ControlledComponent;

function getDefaultActiveKeyFromChildren(children) {
  let defaultActiveKey;
  ValidComponentChildren.forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

const Tabs = React.createClass({
  propTypes: {

    /**
     * Mark the Tab with a matching `eventKey` as active.
     *
     * @controllable onSelect
     */
    activeKey: React.PropTypes.any,

    /**
     * Navigation style for tabs
     *
     * If not specified, it will be treated as `'tabs'` when vertically
     * positioned and `'pills'` when horizontally positioned.
     */
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),

    animation: React.PropTypes.bool,

    id: requiredForA11y(React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])),

    /**
     * Callback fired when a Tab is selected.
     *
     * ```js
     * function (
     * 	Any eventKey,
     * 	SyntheticEvent event?
     * )
     * ```
     *
     * @controllable activeKey
     */
    onSelect: React.PropTypes.func,

    /**
     * Unmount tabs (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      bsStyle: 'tabs',
      animation: true,
      tabWidth: 2,
      position: 'top',
      standalone: false,
      unmountOnExit: false
    };
  },

  render() {
    let {
      id,
      className,
      style,
      children,
      onSelect,
      activeKey,
      ...props
    } = this.props;

    activeKey = this.getActiveKey();

    const containerProps = { id, className, style, activeKey, onSelect };

    const tabsProps = {
      ...props,
      ref: 'tabs',
      role: 'tablist'
    };

    const childTabs = ValidComponentChildren.map(children, this.renderTab);

    const panesProps = {
      ref: 'panes',
      animation: props.animation,
      unmountOnExit: props.unmountOnExit
    };

    return (
      <TabContainer {...containerProps}>
        <div>
          <Nav {...tabsProps}>
            {childTabs}
          </Nav>

          <TabContent {...panesProps}>
            {children}
          </TabContent>
        </div>
      </TabContainer>
    );
  },

  getActiveKey(props = this.props) {
    let { activeKey, children } = props;
    return activeKey === undefined ? getDefaultActiveKeyFromChildren(children) : activeKey;
  },

  renderPane(child, index) {
    return cloneElement(
      child,
      {
        key: child.key ? child.key : index,
      }
    );
  },

  renderTab(child) {
    if (child.props.title == null) {
      return null;
    }

    let { eventKey, title, disabled, tabClassName } = child.props;

    return (
      <NavItem
        eventKey={eventKey}
        disabled={disabled}
        className={tabClassName}
      >
        {title}
      </NavItem>
    );
  },

  getColProps({tabWidth, paneWidth}) {
    let tabsColProps;
    if (tabWidth instanceof Object) {
      tabsColProps = tabWidth;
    } else {
      tabsColProps = {xs: tabWidth};
    }

    let panesColProps;
    if (paneWidth == null) {
      panesColProps = {};
      Object.keys(tabsColProps).forEach( size => {
        panesColProps[size] = styleMaps.GRID_COLUMNS - tabsColProps[size];
      });
    } else if (paneWidth instanceof Object) {
      panesColProps = paneWidth;
    } else {
      panesColProps = {xs: paneWidth};
    }

    return {tabsColProps, panesColProps};
  }

});

export default uncontrollable(Tabs, { activeKey: 'onSelect' });
