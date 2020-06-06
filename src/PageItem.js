/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  /** Disables the PageItem */
  disabled: PropTypes.bool,

  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: PropTypes.bool,

  /** An accessible label indicating the active state.. */
  activeLabel: PropTypes.string,
};

const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)',
};

const PageItem = React.forwardRef(
  (
    { active, disabled, className, style, activeLabel, children, ...props },
    ref,
  ) => {
    const Component = active || disabled ? 'span' : SafeAnchor;
    return (
      <li
        ref={ref}
        style={style}
        className={classNames(className, 'page-item', { active, disabled })}
      >
        <Component className="page-link" disabled={disabled} {...props}>
          {children}
          {active && activeLabel && (
            <span className="sr-only">{activeLabel}</span>
          )}
        </Component>
      </li>
    );
  },
);

PageItem.propTypes = propTypes;
PageItem.defaultProps = defaultProps;
PageItem.displayName = 'PageItem';

export default PageItem;

function createButton(name, defaultValue, label = name) {
  function Button({ children, ...props }) {
    return (
      <PageItem {...props}>
        <span aria-hidden="true">{children || defaultValue}</span>
        <span className="sr-only">{label}</span>
      </PageItem>
    );
  }

  Button.displayName = name;

  return Button;
}

export const First = createButton('First', '«');
export const Prev = createButton('Prev', '‹', 'Previous');
export const Ellipsis = createButton('Ellipsis', '…', 'More');
export const Next = createButton('Next', '›');
export const Last = createButton('Last', '»');
