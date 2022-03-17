import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import SelectableContext from '@restart/ui/SelectableContext';
import TabContext from '@restart/ui/TabContext';
import { useTabPanel } from '@restart/ui/TabPanel';
import { EventKey, TransitionCallbacks } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import Fade from './Fade';
import getTabTransitionComponent from './getTabTransitionComponent';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
  TransitionType,
} from './helpers';

export interface TabPaneProps
  extends TransitionCallbacks,
    BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  eventKey?: EventKey;
  active?: boolean;
  transition?: TransitionType;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

const propTypes = {
  /**
   * @default 'tab-pane'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,

  /**
   * A key that associates the `TabPane` with it's controlling `NavLink`.
   */
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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

const TabPane: BsPrefixRefForwardingComponent<'div', TabPaneProps> =
  React.forwardRef<HTMLElement, TabPaneProps>(
    ({ bsPrefix, transition, ...props }, ref) => {
      const [
        {
          className,
          // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
          as: Component = 'div',
          ...rest
        },
        {
          isActive,
          onEnter,
          onEntering,
          onEntered,
          onExit,
          onExiting,
          onExited,
          mountOnEnter,
          unmountOnExit,
          transition: Transition = Fade,
        },
      ] = useTabPanel({
        ...props,
        transition: getTabTransitionComponent(transition),
      } as any);

      const prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');

      // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
      // conflict with the top level one.
      return (
        <TabContext.Provider value={null}>
          <SelectableContext.Provider value={null}>
            <Transition
              in={isActive}
              onEnter={onEnter}
              onEntering={onEntering}
              onEntered={onEntered}
              onExit={onExit}
              onExiting={onExiting}
              onExited={onExited}
              mountOnEnter={mountOnEnter}
              unmountOnExit={unmountOnExit as any}
            >
              <Component
                {...rest}
                ref={ref}
                className={classNames(className, prefix, isActive && 'active')}
              />
            </Transition>
          </SelectableContext.Provider>
        </TabContext.Provider>
      );
    },
  );

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
