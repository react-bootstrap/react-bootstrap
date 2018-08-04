import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import NavContext from './NavContext';

const propTypes = {
  active: PropTypes.bool,
  role: PropTypes.string,

  href: PropTypes.string,
  tabIndex: PropTypes.string,
  eventKey: PropTypes.any,

  as: PropTypes.any,
};

const defaultProps = {
  disabled: false,
};

class AbstractNavItem extends React.Component {
  render() {
    const {
      active,
      className,
      role,
      tabIndex,
      eventKey,
      as: Component,
      ...props
    } = this.props;

    return (
      <NavContext.Consumer>
        {navContext => {
          if (navContext) {
            if (!role && navContext.role === 'tablist') props.role = 'tab';

            props['data-rb-event-key'] = eventKey;
            props.id = navContext.getControllerId(eventKey);
            props['aria-controls'] = navContext.getControlledId(eventKey);
            props.active =
              active == null && eventKey != null
                ? navContext.activeKey === eventKey
                : active;
          }

          if (props.role === 'tab') {
            props.tabIndex = props.active ? tabIndex : -1;
            props['aria-selected'] = props.active;
          }

          return (
            <Component
              {...props}
              className={classNames(className, props.active && 'active')}
            />
          );
        }}
      </NavContext.Consumer>
    );
  }
}

AbstractNavItem.propTypes = propTypes;
AbstractNavItem.defaultProps = defaultProps;

export default AbstractNavItem;
