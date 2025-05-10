import Tabs from '@restart/ui/Tabs';
import type { EventKey, SelectCallback } from '@restart/ui/types';
import getTabTransitionComponent from './getTabTransitionComponent';
import type { TransitionType } from './helpers';

export interface TabContainerProps {
  /**
   * ID of the TabContainer.
   */
  id?: string | undefined;

  /**
   * Sets a default animation strategy for all children `<TabPane>`s.
   * Defaults to `<Fade>` animation; else, use `false` to disable, or a
   * custom react-transition-group `<Transition/>` component.
   */
  transition?: TransitionType | undefined;

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter?: boolean | undefined;

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit?: boolean | undefined;

  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @type {((eventKey: EventKey, type: 'tab' | 'pane') => string) | undefined}
   * @defaultValue (eventKey, type) => `${props.id}-${type}-${eventKey}`
   */
  generateChildId?:
    | ((eventKey: EventKey, type: 'tab' | 'pane') => string)
    | undefined;

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect?: SelectCallback | undefined;

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey?: EventKey | undefined;

  /**
   * Default value for `eventKey`.
   */
  defaultActiveKey?: EventKey | undefined;
}

const TabContainer = ({ transition, ...props }: TabContainerProps) => (
  <Tabs {...props} transition={getTabTransitionComponent(transition)} />
);

TabContainer.displayName = 'TabContainer';

export default TabContainer;
