import * as React from 'react';
import { useUncontrolled } from 'uncontrollable';
import BaseTabs, { TabsProps as BaseTabsProps } from '@restart/ui/Tabs';
import Nav, { type NavProps } from './Nav.js';
import NavLink from './NavLink.js';
import NavItem from './NavItem.js';
import TabContent from './TabContent.js';
import TabPane from './TabPane.js';
import { forEach, map } from './ElementChildren.js';
import getTabTransitionComponent from './getTabTransitionComponent.js';
import type { TransitionType } from './helpers.js';

export interface TabsProps
  extends Omit<BaseTabsProps, 'transition'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'role'>,
    NavProps {
  /**
   * Sets a default animation strategy for all children `<TabPane>`s.<tbcont
   *
   * Defaults to `<Fade>` animation, else use `false` to disable or a
   * react-transition-group `<Transition/>` component.
   */
  transition?: TransitionType | undefined;
}

function getDefaultActiveKey(children) {
  let defaultActiveKey;
  forEach(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

function renderTab(child) {
  const { title, eventKey, disabled, tabClassName, tabAttrs, id } = child.props;
  if (title == null) {
    return null;
  }

  return (
    <NavItem as="li" role="presentation">
      <NavLink
        as="button"
        type="button"
        eventKey={eventKey}
        disabled={disabled}
        id={id}
        className={tabClassName}
        {...tabAttrs}
      >
        {title}
      </NavLink>
    </NavItem>
  );
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter = false,
    unmountOnExit = false,
    variant = 'tabs',
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  return (
    <BaseTabs
      id={id}
      activeKey={activeKey}
      onSelect={onSelect}
      transition={getTabTransitionComponent(transition)}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <Nav
        id={id}
        {...controlledProps}
        role="tablist"
        as="ul"
        variant={variant}
      >
        {map(children, renderTab)}
      </Nav>

      <TabContent>
        {map(children, (child) => {
          const childProps = { ...child.props };

          delete childProps.title;
          delete childProps.disabled;
          delete childProps.tabClassName;
          delete childProps.tabAttrs;

          return <TabPane {...childProps} />;
        })}
      </TabContent>
    </BaseTabs>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
