import cn from 'classnames';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass as setBsClass, prefix } from './utils/bootstrapUtils';

let animationPropType = PropTypes.oneOfType([
  PropTypes.bool,
  elementType
]);

let TabContent = React.createClass({

  propTypes: {

    /**
     * the Component used to render the TabContent
     */
    componentClass: elementType,

    /**
     * Sets a default animation strategy for all children TabPanes.
     * Use `false` to disable, `true` to enable the default "Fade"
     * animation or any `<Transition>` component.
     */
    animation: PropTypes.oneOfType([
      PropTypes.bool,
      elementType
    ]),

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: PropTypes.bool,
  },

  contextTypes: {
    $bs_tabcontainer: React.PropTypes.shape({
      activeKey: React.PropTypes.any,
      onSelect: PropTypes.func,
    })
  },

  childContextTypes: {
    $bs_tabcontent: PropTypes.shape({
      bsClass: PropTypes.string,
      animation: animationPropType,
      activeKey: PropTypes.any,
      onExited: PropTypes.func,
      register: PropTypes.func,
      unmountOnExit: PropTypes.bool,
    }),
  },

  getDefaultProps() {
    return {
      componentClass: 'div',
      animation: true,
      unmountOnExit: false
    };
  },

  getInitialState() {
    return {
      exitingPane: null
    };
  },

  getChildContext() {
    let exitingPane = this._exitingPane;

    return {
      $bs_tabcontent: {
        bsClass: this.props.bsClass,
        animation: this.props.animation,
        activeKey: exitingPane ? undefined : this.getActiveKey(),
        onExited: this.handlePaneExited,
        register: this.registerPane,
        unmountOnExit: this.props.unmountOnExit
      }
    };
  },

  componentWillMount() {
    this.panes = [];
  },

  /**
   * This belongs in `componentWillReceiveProps()` but
   * 0.14.x contains a bug where cwrp isn't called when only context changes.
   * fixed in master, not sure it will make it into any 0.14 release
   */
  componentWillUpdate(nextProps, _, nextContext) {
    let currentActiveKey = this.getActiveKey();
    let nextActiveKey = this.getActiveKey(nextContext);
    let currentKeyIsStillValid = this.panes.indexOf(currentActiveKey) !== -1;

    if (this.panes.indexOf(this._exitingPane) === -1) {
      this._exitingPane = null;
    }

    if (nextActiveKey !== currentActiveKey && currentKeyIsStillValid) {
      this._exitingPane = currentActiveKey;
    }
  },

  render() {
    let { className, children } = this.props;
    let Component = this.props.componentClass;

    let contentClass = prefix(this.props, 'content');

    return (
      <Component className={cn(contentClass, className)}>
        { children }
      </Component>
    );
  },

  handlePaneExited() {
    this._exitingPane = null;
    this.forceUpdate();
  },

  /**
   * This is unfortunately neccessary because the TabContent needs to know if
   * a TabPane is ever going to exit, since it may unmount and just leave the
   * TabContent to wait longingly forever for the handlePaneExited to be called.
   */
  registerPane(eventKey) {
    let panes = this.panes;

    invariant(panes.indexOf(eventKey) === -1,
      'You cannot have multiple TabPanes of with the same `eventKey` in the same ' +
      'TabContent component. Duplicate eventKey: ' + eventKey
    );

    panes.push(eventKey);

    return ()=> {
      panes.splice(panes.indexOf(eventKey), 1);

      // #1892
      // new active state can propagate down _before_
      // the tab actually unmounts, so it will map be exiting.
      // since an exiting tab won't complete, clear the bad state
      if (eventKey === this._exitingPane) {
        this.handlePaneExited();
      }

      // If the tab was active, we need to tell the container
      // that it no longer exists and as such is not active.
      if (eventKey === this.getActiveKey()) {
        this.getContext('$bs_tabcontainer').onSelect();
      }
    };
  },

  getActiveKey(context = this.context) {
    return this.getContext('$bs_tabcontainer', context).activeKey;
  },

  getContext(key, context = this.context) {
    return context[key] || {};
  }
});

export default setBsClass('tab', TabContent);
