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
  activeLabel: PropTypes.string.isRequired,
};

const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)',
};

export default function PaginationItem({
  active,
  disabled,
  className,
  style,
  activeLabel,
  children,
  ...props,
}) {
  const Component = active ? 'span' : SafeAnchor;
  return (
    <li
      style={style}
      className={classNames(className, { active, disabled })}
    >
      <Component disabled={disabled} {...props}>
        {children}
        {active && (
          <span className="sr-only">{activeLabel}</span>
        )}
      </Component>
    </li>
  );
}

PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;

export const First = props => (
  <li aria-label="First" {...props}>
    <SafeAnchor>{'\u00ab'}</SafeAnchor>
  </li>
);

export const Prev = props => (
  <li aria-label="Previous" {...props}>
    <SafeAnchor>{'\u2039'}</SafeAnchor>
  </li>
);

export const Ellipsis = props => (
  <li aria-label="More" {...props}>
    <span>{'\u2026'}</span>
  </li>
);

export const Next = props => (
  <li aria-label="Next" {...props}>
    <SafeAnchor>{'\u203a'}</SafeAnchor>
  </li>
);

export const Last = props => (
  <li aria-label="Last" {...props}>
    <SafeAnchor>{'\u00bb'}</SafeAnchor>
  </li>
);

