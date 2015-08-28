import React, { cloneElement } from 'react';

import Col from './Col';
import Grid from './Grid';
import Nav from './Nav';
import NavItem from './NavItem';
import Row from './Row';
import styleMaps from './styleMaps';

import ValidComponentChildren from './utils/ValidComponentChildren';

let paneId = (props, child) => child.props.id ? child.props.id : props.id && (props.id + '___pane___' + child.props.eventKey);
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

const Tabs = React.createClass({
  propTypes: {
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    /**
     * Navigation style for tabs
     *
     * If not specified, it will be treated as `'tabs'` when vertically
     * positioned and `'pills'` when horizontally positioned.
     */
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),
    animation: React.PropTypes.bool,
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onSelect: React.PropTypes.func,
    position: React.PropTypes.oneOf(['top', 'left', 'right']),
    /**
     * Number of grid columns for the tabs if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width.
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
     */
    paneWidth: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ])
  },

  getDefaultProps() {
    return {
      animation: true,
      tabWidth: 2,
      position: 'top'
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
    }
  },

  handlePaneAnimateOutEnd() {
    this.setState({
      previousActiveKey: null
    });
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
      children,
      ...props
    } = this.props;

    const isHorizontal = position === 'left' || position === 'right';

    if (bsStyle == null) {
      bsStyle = isHorizontal ? 'pills' : 'tabs';
    }

    const containerProps = {id, className, style};

    const tabsProps = {
      ...props,
      bsStyle,
      stacked: isHorizontal,
      activeKey: this.getActiveKey(),
      onSelect: this.handleSelect,
      ref: 'tabs',
      role: 'tablist'
    };
    const childTabs = ValidComponentChildren.map(children, this.renderTab);

    const panesProps = {
      className: 'tab-content',
      ref: 'panes'
    };
    const childPanes = ValidComponentChildren.map(children, this.renderPane);

    if (isHorizontal) {
      const {tabsColProps, panesColProps} =
        this.getColProps({tabWidth, paneWidth});

      const tabs = (
        <Col componentClass={Nav} {...tabsProps} {...tabsColProps}>
          {childTabs}
        </Col>
      );
      const panes = (
        <Col {...panesProps} {...panesColProps}>
          {childPanes}
        </Col>
      );

      let body;
      if (position === 'left') {
        body = (
          <Row {...containerProps}>
            {tabs}
            {panes}
          </Row>
        );
      } else {
        body = (
          <Row {...containerProps}>
            {panes}
            {tabs}
          </Row>
        );
      }

      return (
        <Grid>
          {body}
        </Grid>
      );
    } else {
      return (
        <div {...containerProps}>
          <Nav {...tabsProps}>
            {childTabs}
          </Nav>

          <div {...panesProps}>
            {childPanes}
          </div>
        </div>
      );
    }
  },

  getActiveKey() {
    return this.props.activeKey !== undefined ? this.props.activeKey : this.state.activeKey;
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
        id: paneId(this.props, child),
        'aria-labelledby': tabId(this.props, child),
        key: child.key ? child.key : index,
        animation: this.props.animation,
        onAnimateOutEnd: paneIsAlreadyActive ? this.handlePaneAnimateOutEnd : null
      }
    );
  },

  renderTab(child) {
    if (child.props.title == null) {
      return null;
    }

    let {eventKey, title, disabled} = child.props;

    return (
      <NavItem
        linkId={tabId(this.props, child)}
        ref={'tab' + eventKey}
        aria-controls={paneId(this.props, child)}
        eventKey={eventKey}
        disabled={disabled}>
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
      Object.keys(tabsColProps).forEach(function (size) {
        panesColProps[size] = styleMaps.GRID_COLUMNS - tabsColProps[size];
      });
    } else if (paneWidth instanceof Object) {
      panesColProps = paneWidth;
    } else {
      panesColProps = {xs: paneWidth};
    }

    return {tabsColProps, panesColProps};
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

export default Tabs;
