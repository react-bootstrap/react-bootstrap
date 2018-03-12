import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import requiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

import Nav from './Nav';
import NavLink from './NavLink';
import NavItem from './NavItem';
import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

import * as ValidComponentChildren from './utils/ValidComponentChildren';

const TabContainer = UncontrolledTabContainer.ControlledComponent;

const propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.any,

  /**
   * Navigation style
   *
   * @type {('tabs'| 'pills')}
   */
  variant: PropTypes.string,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   *
   * @type {Transition | false}
   * @default {Fade}
   */
  transition: PropTypes.oneOfType([PropTypes.oneOf([false]), elementType]),

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
  unmountOnExit: PropTypes.bool
};

const defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  let defaultActiveKey;
  ValidComponentChildren.forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

class Tabs extends React.Component {
  renderTab(child) {
    const { title, eventKey, disabled, tabClassName } = child.props;
    if (title == null) {
      return null;
    }

    return (
      <NavItem
        componentClass={NavLink}
        eventKey={eventKey}
        disabled={disabled}
        className={tabClassName}
      >
        {title}
      </NavItem>
    );
  }

  render() {
    const {
      id,
      onSelect,
      transition,
      mountOnEnter,
      unmountOnExit,
      className,
      style,
      children,
      activeKey = getDefaultActiveKey(children),
      ...props
    } = this.props;

    return (
      <TabContainer
        id={id}
        activeKey={activeKey}
        onSelect={onSelect}
        transition={transition}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        <Nav {...props} role="tablist" componentClass="nav">
          {ValidComponentChildren.map(children, this.renderTab)}
        </Nav>

        <TabContent>
          {ValidComponentChildren.map(children, child => {
            const childProps = { ...child.props };
            delete childProps.title;
            delete childProps.disabled;
            delete childProps.tabClassName;

            return <TabPane {...childProps} />;
          })}
        </TabContent>
      </TabContainer>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default uncontrollable(Tabs, {
  activeKey: 'onSelect'
});
