import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import TabContext from './TabContext';
import SelectableContext, { makeEventKey } from './SelectableContext';
import Fade from './Fade';

const propTypes = {
  /**
   * @default 'tab-pane'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,

  /**
   * A key that associates the `TabPane` with it's controlling `NavLink`.
   */
  eventKey: PropTypes.any,

  /**
   * Toggles the active state of the TabPane, this is generally controlled by a
   * TabContainer.
   */
  active: PropTypes.bool,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Defaults to `<Fade>`
   * animation, else use `false` to disable or a react-transition-group
   * `<Transition/>` component.
   */
  transition: PropTypes.oneOfType([PropTypes.bool, PropTypes.elementType]),

  /**
   *
   * @default 'tab-pane'
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

  /** @ignore * */
  id: PropTypes.string,

  /** @ignore * */
  'aria-labelledby': PropTypes.string,
};

function useTabContext(props) {
  const context = useContext(TabContext);

  if (!context) return props;

  const { activeKey, getControlledId, getControllerId, ...rest } = context;
  const shouldTransition =
    props.transition !== false && rest.transition !== false;

  let key = makeEventKey(props.eventKey);

  return {
    ...props,
    active:
      props.active == null && key != null
        ? makeEventKey(activeKey) === key
        : props.active,
    id: getControlledId(props.eventKey),
    'aria-labelledby': getControllerId(props.eventKey),
    transition:
      shouldTransition && (props.transition || rest.transition || Fade),
    mountOnEnter:
      props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
    unmountOnExit:
      props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit,
  };
}

const TabPane = React.forwardRef((props, ref) => {
  const {
    bsPrefix,
    className,
    active,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    eventKey: _,
    ...rest
  } = useTabContext(props);

  const prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');

  if (!active && !Transition && unmountOnExit) return null;

  let pane = (
    <Component
      {...rest}
      ref={ref}
      role="tabpanel"
      aria-hidden={!active}
      className={classNames(className, prefix, { active })}
    />
  );

  if (Transition)
    pane = (
      <Transition
        in={active}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        {pane}
      </Transition>
    );

  // We provide an empty the TabContext so `<Nav>`s in `<TabPane>`s don't
  // conflict with the top level one.
  return (
    <TabContext.Provider value={null}>
      <SelectableContext.Provider value={null}>
        {pane}
      </SelectableContext.Provider>
    </TabContext.Provider>
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
