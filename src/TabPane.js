import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import warning from 'warning';

import { bsClass, getClassSet, prefix, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

import Fade from './Fade';

const propTypes = {
  /**
   * Uniquely identify the `<TabPane>` among its siblings.
   */
  eventKey: PropTypes.any,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or any `<Transition>`
   * component.
   */
  animation: PropTypes.oneOfType([PropTypes.bool, elementType]),

  /** @private **/
  id: PropTypes.string,

  /** @private **/
  'aria-labelledby': PropTypes.string,

  /**
   * If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   */
  bsClass: PropTypes.string,

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
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: PropTypes.bool,
};

const contextTypes = {
  $bs_tabContainer: PropTypes.shape({
    getTabId: PropTypes.func,
    getPaneId: PropTypes.func,
  }),
  $bs_tabContent: PropTypes.shape({
    bsClass: PropTypes.string,
    animation: PropTypes.oneOfType([
      PropTypes.bool, elementType,
    ]),
    activeKey: PropTypes.any,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    onPaneEnter: PropTypes.func.isRequired,
    onPaneExited: PropTypes.func.isRequired,
    exiting: PropTypes.bool.isRequired,
  }),
};

/**
 * We override the `<TabContainer>` context so `<Nav>`s in `<TabPane>`s don't
 * conflict with the top level one.
 */
const childContextTypes = {
  $bs_tabContainer: PropTypes.oneOf([null]),
};

class TabPane extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExited = this.handleExited.bind(this);

    this.in = false;
  }

  getChildContext() {
    return {
      $bs_tabContainer: null,
    };
  }

  componentDidMount() {
    if (this.shouldBeIn()) {
      // In lieu of the action event firing.
      this.handleEnter();
    }
  }

  componentDidUpdate() {
    if (this.in) {
      if (!this.shouldBeIn()) {
        // We shouldn't be active any more. Notify the parent.
        this.handleExited();
      }
    } else if (this.shouldBeIn()) {
      // We are the active child. Notify the parent.
      this.handleEnter();
    }
  }

  componentWillUnmount() {
    if (this.in) {
      // In lieu of the action event firing.
      this.handleExited();
    }
  }

  handleEnter() {
    const tabContent = this.context.$bs_tabContent;
    if (!tabContent) {
      return;
    }

    this.in = tabContent.onPaneEnter(this, this.props.eventKey);
  }

  handleExited() {
    const tabContent = this.context.$bs_tabContent;
    if (!tabContent) {
      return;
    }

    tabContent.onPaneExited(this);
    this.in = false;
  }

  getAnimation() {
    if (this.props.animation != null) {
      return this.props.animation;
    }

    const tabContent = this.context.$bs_tabContent;
    return tabContent && tabContent.animation;
  }

  isActive() {
    const tabContent = this.context.$bs_tabContent;
    const activeKey = tabContent && tabContent.activeKey;

    return this.props.eventKey === activeKey;
  }

  shouldBeIn() {
    return this.getAnimation() && this.isActive();
  }

  render() {
    const {
      eventKey,
      className,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      mountOnEnter: propsMountOnEnter,
      unmountOnExit: propsUnmountOnExit,
      ...props
    } = this.props;

    const {
      $bs_tabContent: tabContent, $bs_tabContainer: tabContainer,
    } = this.context;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['animation']);

    const active = this.isActive();
    const animation = this.getAnimation();

    const mountOnEnter = propsMountOnEnter != null ?
      propsMountOnEnter : tabContent && tabContent.mountOnEnter;
    const unmountOnExit = propsUnmountOnExit != null ?
      propsUnmountOnExit : tabContent && tabContent.unmountOnExit;

    if (!active && !animation && unmountOnExit) {
      return null;
    }

    const Transition = animation === true ? Fade : animation || null;

    if (tabContent) {
      bsProps.bsClass = prefix(tabContent, 'pane');
    }

    const classes = {
      ...getClassSet(bsProps),
      active,
    };

    if (tabContainer) {
      warning(!elementProps.id && !elementProps['aria-labelledby'],
        'In the context of a `<TabContainer>`, `<TabPanes>` are given ' +
        'generated `id` and `aria-labelledby` attributes for the sake of ' +
        'proper component accessibility. Any provided ones will be ignored. ' +
        'To control these attributes directly provide a `generateChildId` ' +
        'prop to the parent `<TabContainer>`.'
      );

      elementProps.id = tabContainer.getPaneId(eventKey);
      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
    }

    const pane = (
      <div
        {...elementProps}
        role="tabpanel"
        aria-hidden={!active}
        className={classNames(className, classes)}
      />
    );

    if (Transition) {
      const exiting = tabContent && tabContent.exiting;

      return (
        <Transition
          in={active && !exiting}
          onEnter={createChainedFunction(this.handleEnter, onEnter)}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleExited, onExited)}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
        >
          {pane}
        </Transition>
      );
    }

    return pane;
  }
}

TabPane.propTypes = propTypes;
TabPane.contextTypes = contextTypes;
TabPane.childContextTypes = childContextTypes;

export default bsClass('tab-pane', TabPane);
