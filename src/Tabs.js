import React from 'react';
import requiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

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
  activeKey: React.PropTypes.any,

  /**
   * Navigation style
   */
  bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),

  animation: React.PropTypes.bool,

  id: requiredForA11y(React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ])),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: React.PropTypes.func,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: React.PropTypes.bool,
};

const defaultProps = {
  bsStyle: 'tabs',
  animation: true,
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
      animation,
      unmountOnExit,
      bsClass,
      className,
      style,
      children,
      activeKey = getDefaultActiveKey(children),
      ...props,
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
          <Nav
            {...props}
            role="tablist"
          >
            {ValidComponentChildren.map(children, this.renderTab)}
          </Nav>

          <TabContent
            bsClass={bsClass}
            animation={animation}
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
