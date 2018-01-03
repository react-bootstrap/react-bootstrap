/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  eventKey: PropTypes.any,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  activeLabel: PropTypes.string.isRequired
};

const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};

export default function PaginationItem({
  active,
  disabled,
  className,
  style,
  activeLabel,
  children,
  ...props
}) {
  const Component = active || disabled ? 'span' : SafeAnchor;
  return (
    <li style={style} className={classNames(className, { active, disabled })}>
      <Component disabled={disabled} {...props}>
        {children}
        {active && <span className="sr-only">{activeLabel}</span>}
      </Component>
    </li>
  );
}

PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;

function createButton(name, defaultValue, label = name) {
  return class extends React.Component {
    static displayName = name;
    static propTypes = { disabled: PropTypes.bool };
    render() {
      const { disabled, children, className, ...props } = this.props;
      const Component = disabled ? 'span' : SafeAnchor;

      return (
        <li
          aria-label={label}
          className={classNames(className, { disabled })}
          {...props}
        >
          <Component>{children || defaultValue}</Component>
        </li>
      );
    }
  };
}

export const First = createButton('First', '\u00ab');
export const Prev = createButton('Prev', '\u2039');
export const Ellipsis = createButton('Ellipsis', '\u2026', 'More');
export const Next = createButton('Next', '\u203a');
export const Last = createButton('Last', '\u00bb');
