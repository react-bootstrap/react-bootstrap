import React from 'react';
import PropTypes from 'prop-types';
import requiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';
import elementType from 'prop-types-extra/lib/elementType';

import Nav from './Nav';
import NavItem from './NavItem';
import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';
import { bsClass as setBsClass } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

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
   */
  bsStyle: PropTypes.oneOf(['tabs', 'pills']),

  /**
   * Sets a default animation strategy. Use `false` to disable, `true`
   * to enable the default `<Fade>` animation, or a react-transition-group
   * v2 `<Transition/>` component.
   */
  animation: PropTypes.oneOfType([PropTypes.bool, elementType]),

  id: requiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

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
  bsStyle: 'tabs',
  animation: true,
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
      <NavItem eventKey={eventKey} disabled={disabled} className={tabClassName}>
        {title}
      </NavItem>
    );
  }

  render() {
    const {
      id,
      onSelect,
      animation,
      mountOnEnter,
      unmountOnExit,
      bsClass,
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
        className={className}
        style={style}
      >
        <div>
          <Nav {...props} role="tablist">
            {ValidComponentChildren.map(children, this.renderTab)}
          </Nav>

          <TabContent
            bsClass={bsClass}
            animation={animation}
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
          >
            {children}
          </TabContent>
        </div>
      </TabContainer>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

setBsClass('tab', Tabs);

export default uncontrollable(Tabs, { activeKey: 'onSelect' });
