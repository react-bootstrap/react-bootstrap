import classNames from 'classnames';
import React, { cloneElement, findDOMNode } from 'react';

import Col from './Col';
import Nav from './Nav';
import NavItem from './NavItem';
import styleMaps from './styleMaps';
import keycode from 'keycode';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

let paneId = (props, child) => child.props.id ? child.props.id : props.id && (props.id + '___pane___' + child.props.eventKey);
let tabId = (props, child) => child.props.id ? child.props.id + '___tab' : props.id && (props.id + '___tab___' + child.props.eventKey);

let findChild = ValidComponentChildren.find;

function getDefaultActiveKeyFromChildren(children) {
  let defaultActiveKey;

  ValidComponentChildren.forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

function move(children, currentKey, keys, moveNext) {
  let lastIdx = keys.length - 1;
  let stopAt = keys[moveNext ? Math.max(lastIdx, 0) : 0];
  let nextKey = currentKey;

  function getNext() {
    let idx = keys.indexOf(nextKey);
    nextKey = moveNext
      ? keys[Math.min(lastIdx, idx + 1)]
      : keys[Math.max(0, idx - 1)];

    return findChild(children,
      _child => _child.props.eventKey === nextKey);
  }

  let next = getNext();

  while (next.props.eventKey !== stopAt && next.props.disabled) {
    next = getNext();
  }

  return next.props.disabled ? currentKey : next.props.eventKey;
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
    ]),
    /**
     * Render without clearfix if horizontally positioned
     */
    standalone: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      animation: true,
      tabWidth: 2,
      position: 'top',
      standalone: false
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

  componentDidUpdate() {
    let tabs = this._tabs;
    let tabIdx = this._eventKeys().indexOf(this.getActiveKey());

    if (this._needsRefocus) {
      this._needsRefocus = false;
      if (tabs && tabIdx !== -1) {
        let tabNode = findDOMNode(tabs[tabIdx]);

        if (tabNode) {
          tabNode.firstChild.focus();
        }
      }
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
      standalone,
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
        <Col {...panesProps} {...panesColProps}>
          {childPanes}
        </Col>
      );

      if (position === 'left') {
        return (
          <div {...containerProps}>
            {tabs}
            {panes}
          </div>
        );
      }

      return (
        <div {...containerProps}>
          {panes}
          {tabs}
        </div>
      );
    }

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

  renderTab(child, index) {
    if (child.props.title == null) {
      return null;
    }

    let { eventKey, title, disabled, onKeyDown, tabClassName, tabIndex = 0 } = child.props;
    let isActive = this.getActiveKey() === eventKey;

    return (
      <NavItem
        linkId={tabId(this.props, child)}
        ref={ref => (this._tabs || (this._tabs = []))[index] = ref}
        aria-controls={paneId(this.props, child)}
        onKeyDown={createChainedFunction(this.handleKeyDown, onKeyDown)}
        eventKey={eventKey}
        tabIndex={isActive ? tabIndex : -1}
        disabled={disabled }
        className={tabClassName}>
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
  },

  handleKeyDown(event) {
    let keys = this._eventKeys();
    let currentKey = this.getActiveKey() || keys[0];
    let next;

    switch (event.keyCode) {

    case keycode.codes.left:
    case keycode.codes.up:
      next = move(this.props.children, currentKey, keys, false);

      if (next && next !== currentKey) {
        event.preventDefault();
        this.handleSelect(next);
        this._needsRefocus = true;
      }
      break;
    case keycode.codes.right:
    case keycode.codes.down:
      next = move(this.props.children, currentKey, keys, true);

      if (next && next !== currentKey) {
        event.preventDefault();
        this.handleSelect(next);
        this._needsRefocus = true;
      }
      break;
    default:
    }
  },

  _eventKeys() {
    let keys = [];

    ValidComponentChildren.forEach(this.props.children,
      ({props: { eventKey }}) => keys.push(eventKey));

    return keys;
  }
});

export default Tabs;
