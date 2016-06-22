import classNames from 'classnames';
import uncontrollable from 'uncontrollable';
import React, { cloneElement } from 'react';
import Col from './Col';
import Nav from './Nav';
import NavItem from './NavItem';

import styleMaps from './styleMaps';
import requiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import deprecationWarning from './utils/deprecationWarning';
import ValidComponentChildren from './utils/ValidComponentChildren';

import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';

let TabContainer = UncontrolledTabContainer.ControlledComponent;

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

    /**
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    position: React.PropTypes.oneOf(['top', 'left', 'right']),

    /**
     * Number of grid columns for the tabs if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    tabWidth: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    /**
     * Number of grid columns for the panes if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width. If not
     * specified, it will be treated as `styleMaps.GRID_COLUMNS` minus
     * `tabWidth`.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    paneWidth: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    /**
     * Render without clearfix if horizontally positioned
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    standalone: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'tab',
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
      position,
      bsStyle,
      tabWidth,
      paneWidth,
      standalone,
      children,
      onSelect,
      activeKey,
      ...props
    } = this.props;

    activeKey = this.getActiveKey();

    const isHorizontal = position === 'left' || position === 'right';

    if (bsStyle == null) {
      bsStyle = isHorizontal ? 'pills' : 'tabs';
    }

    const containerProps = { id, className, style, activeKey, onSelect };

    const tabsProps = {
      ...props,
      bsStyle,
      bsClass: undefined,
      stacked: isHorizontal,
      ref: 'tabs',
      role: 'tablist'
    };

    const childTabs = ValidComponentChildren.map(children, this.renderTab);

    const panesProps = {
      ref: 'panes',
      animation: props.animation,
      unmountOnExit: props.unmountOnExit
    };

    const childPanes = children;

    if (isHorizontal) {
      deprecationWarning({
        message: 'Horizontal Tabs (position "left" or "right") are deprecated in favor ' +
                 'of the more flexible TabContainer component.'
      });

      if (!standalone) {
        containerProps.className =
          classNames(containerProps.className, 'clearfix');
      }

      const {tabsColProps, panesColProps} =
        this.getColProps({tabWidth, paneWidth});

      const tabs = (
        <Col componentClass={Nav} {...tabsProps} {...tabsColProps}>
          {childTabs}
        </Col>
      );
      const panes = (
        <Col componentClass={TabContent} {...panesProps} {...panesColProps}>
          {childPanes}
        </Col>
      );

      if (position === 'left') {
        return (
          <TabContainer {...containerProps}>
            <div>
              {tabs}
              {panes}
            </div>
          </TabContainer>
        );
      }

      return (
        <TabContainer {...containerProps}>
          <div>
            {panes}
            {tabs}
          </div>
        </TabContainer>
      );
    }

    return (
      <TabContainer {...containerProps}>
        <div>
          <Nav {...tabsProps}>
            {childTabs}
          </Nav>

          <TabContent {...panesProps}>
            {childPanes}
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
