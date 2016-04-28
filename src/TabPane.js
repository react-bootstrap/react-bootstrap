import classNames from 'classnames';
import addClass from 'dom-helpers/class/addClass';
import React, { PropTypes } from 'react';
import elementType from 'react-prop-types/lib/elementType';
import warning from 'warning';

import { bsClass as setBsClass, prefix } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import { TAB, PANE } from './utils/tabUtils';

import Fade from './Fade';

let TabPane = React.createClass({
  propTypes: {

    /**
     * Uniquely identify the TabPane amoung its siblings.
     */
    eventKey: PropTypes.any,

    /**
     * Use animation when showing or hiding TabPanes. Use `false` to disable,
     * `true` to enable the default "Fade" animation or any Transition component.
     *
     */
    animation: PropTypes.oneOfType([
      PropTypes.bool,
      elementType
    ]),

    /** @private **/
    id: PropTypes.string,

    /** @private **/
    'aria-labelledby': PropTypes.string,

    /**
     * Transition onEnter callback when animation is not `false`
     */
    onEnter: PropTypes.func,

    /**
     * Transition onEntering callback when animation is not `false`
     */
    onEntering: PropTypes.func,

    /**
     * Transition onEntered callback when animation is not `false`
     */
    onEntered: PropTypes.func,

    /**
     * Transition onExit callback when animation is not `false`
     */
    onExit: PropTypes.func,

    /**
     * Transition onExiting callback when animation is not `false`
     */
    onExiting: PropTypes.func,

    /**
     * Transition onExited callback when animation is not `false`
     */
    onExited: PropTypes.func,

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: PropTypes.bool
  },

  contextTypes: {
    $bs_tabcontainer: PropTypes.shape({
      getId: PropTypes.func,
      unmountOnExit: PropTypes.bool
    }),
    $bs_tabcontent: PropTypes.shape({
      bsClass: PropTypes.string,
      animation: PropTypes.oneOfType([
        PropTypes.bool,
        elementType
      ]),
      activeKey: PropTypes.any,
      onExited: PropTypes.func,
      register: PropTypes.func,
      unmountOnExit: PropTypes.bool
    }),
  },

  /**
   * We override the TabContainer context so Navs in TabPanes
   * don't conflict with the top level one.
   */
  childContextTypes: {
    $bs_tabcontainer: PropTypes.oneOf([null])
  },

  componentWillMount() {
    this.exited = !this.isActive();
    this.registerWithParent();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.eventKey !== this.props.eventKey) {
      this.unregisterWithParent();
      this.registerWithParent(nextProps, nextContext);
    }
  },

  componentWillUpdate(nextProps, _, nextContext) {
    if (this.isActive(nextProps, nextContext)) {
      this.exited = false;
    } else if (!this.exited && !this.getTransition(nextProps, nextContext)) {
      // Otherwise let handleHidden take care of marking exited.
      this.exited = true;
      this._fireExitedCallback = true;
    }
  },

  componentDidUpdate() {
    if (this._fireExitedCallback) {
      this._fireExitedCallback = false;
      this.onExited();
    }
  },

  componentWillUnmount() {
    this.unregisterWithParent();
  },

  getChildContext() {
    return { $bs_tabcontainer: null };
  },

  getTransition(props = this.props, context = this.context) {
    context = this.getContext('$bs_tabcontent', context);
    return props.animation != null
      ? props.animation
      : context.animation;
  },

  getUnmountOnExit() {
    let context = this.getContext('$bs_tabcontent', this.context);
    return this.props.unmountOnExit != null
      ? this.props.unmountOnExit
      : context.unmountOnExit;
  },

  isActive(props = this.props, context = this.context) {
    return this.getContext('$bs_tabcontent', context).activeKey === props.eventKey;
  },

  render() {
    let active = this.isActive();
    let visible = active || !this.exited;
    let getId = this.getContext('$bs_tabcontainer').getId;
    let bsClass = this.props.bsClass || this.getContext('$bs_tabcontent').bsClass;

    let Transition = this.getTransition();

    if (!visible && !Transition && this.getUnmountOnExit()) {
      return null;
    }

    let classes = {
      active: visible,
      [prefix({ bsClass }, 'pane')]: true
    };

    let {
        eventKey
      , id, 'aria-labelledby': labelledBy
      , onExit, onExiting, onExited
      , onEnter, onEntering, onEntered } = this.props;

    if (typeof Transition === 'boolean') {
      Transition = Transition ? Fade : null;
    }

    if (getId) {
      warning(!(id || labelledBy),
        'In the context of a TabContainer, TabPanes are given generated `id` and `aria-labelledby` ' +
        'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' +
        'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.'
      );
      id = getId(eventKey, PANE) || null;
      labelledBy = getId(eventKey, TAB) || null;
    }

    let tabPane = (
      <div {...this.props}
        id={id}
        role="tabpanel"
        aria-hidden={!visible}
        aria-labelledby={labelledBy}
        className={classNames(this.props.className, classes, { in: !Transition })}
      >
        { this.props.children }
      </div>
    );

    if (Transition) {
      tabPane = (
        <Transition
          in={active}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleExited, onExited)}
          onEnter={createChainedFunction(this.handleEnter, onEnter)}
          onEntering={onEntering}
          onEntered={onEntered}
          unmountOnExit={this.getUnmountOnExit()}
        >
          { tabPane }
        </Transition>
      );
    }

    return tabPane;
  },

  onExited() {
    let context = this.getContext('$bs_tabcontent');
    if (context.onExited) {
      context.onExited(
        this.props.eventKey
      );
    }
  },

  handleEnter(node) {
    // ref: https://github.com/react-bootstrap/react-overlays/issues/40
    if (this.isActive()) {
      addClass(node, 'active');
      node.offsetWidth; // eslint-disable-line no-unused-expressions
    }
  },

  handleExited() {
    this.exited = true;
    this.onExited();
    this.forceUpdate();
  },

  registerWithParent(props = this.props, context = this.context) {
    let register = this.getContext('$bs_tabcontent', context).register;

    if (register) {
      this.unregister = register(props.eventKey);
    }
  },

  unregisterWithParent() {
    if (this.unregister) {
      this.unregister();
    }
  },

  getContext(key, context = this.context) {
    return context[key] || {};
  }
});

export default setBsClass('tab', TabPane);
