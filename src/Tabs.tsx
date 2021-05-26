import * as React from 'react';
import PropTypes from 'prop-types';

import requiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useUncontrolled } from 'uncontrollable';

import Nav from './Nav';
import NavLink from './NavLink';
import NavItem from './NavItem';
import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

import { forEach, map } from './ElementChildren';
import { SelectCallback, TransitionType } from './helpers';
import { EventKey } from './types';

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  activeKey?: EventKey;
  defaultActiveKey?: EventKey;
  onSelect?: SelectCallback;
  variant?: 'tabs' | 'pills';
  transition?: TransitionType;
  id?: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

const propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The default active key that is selected on start */
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Navigation style
   *
   * @type {('tabs'| 'pills')}
   */
  variant: PropTypes.string,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s.
   * Defaults to `<Fade>` animation, else use `false` to disable or a
   * react-transition-group `<Transition/>` component.
   *
   * @type {Transition | false}
   * @default {Fade}
   */
  transition: PropTypes.oneOfType([
    PropTypes.oneOf([false]),
    PropTypes.elementType,
  ]),

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: requiredForA11y(PropTypes.string),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: PropTypes.func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: PropTypes.bool,
};

const defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false,
};

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
  const { title, eventKey, disabled, tabClassName, id } = child.props;
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
      >
        {title}
      </NavLink>
    </NavItem>
  );
}

const Tabs = (props: TabsProps) => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter,
    unmountOnExit,
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  return (
    <TabContainer
      id={id}
      activeKey={activeKey}
      onSelect={onSelect}
      transition={transition}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <Nav {...controlledProps} role="tablist" as="ul">
        {map(children, renderTab)}
      </Nav>

      <TabContent>
        {map(children, (child) => {
          const childProps = { ...child.props };

          delete childProps.title;
          delete childProps.disabled;
          delete childProps.tabClassName;

          return <TabPane {...childProps} />;
        })}
      </TabContent>
    </TabContainer>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
Tabs.displayName = 'Tabs';

export default Tabs;
