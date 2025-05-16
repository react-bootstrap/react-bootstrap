import classNames from 'classnames';
import * as React from 'react';
import SelectableContext from '@restart/ui/SelectableContext';
import TabContext from '@restart/ui/TabContext';
import { useTabPanel } from '@restart/ui/TabPanel';
import type {
  DynamicRefForwardingComponent,
  EventKey,
} from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import Fade from './Fade';
import getTabTransitionComponent from './getTabTransitionComponent';
import type { TransitionType } from './helpers';
import type { TransitionCallbacks } from './types';

export interface TabPaneProps
  extends TransitionCallbacks,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'tab-pane'
   */
  bsPrefix?: string | undefined;

  /**
   * A key that associates the `TabPane` with it's controlling `NavLink`.
   */
  eventKey?: EventKey | undefined;

  /**
   * Toggles the active state of the TabPane, this is generally controlled by a
   * TabContainer.
   */
  active?: boolean | undefined;

  /**
   * Use animation when showing or hiding `<TabPane>`s. Defaults to `<Fade>`
   * animation, else use `false` to disable or a react-transition-group
   * `<Transition/>` component.
   */
  transition?: TransitionType | undefined;

  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter?: boolean | undefined;

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit?: boolean | undefined;
}

const TabPane: DynamicRefForwardingComponent<'div', TabPaneProps> =
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

export default TabPane;
