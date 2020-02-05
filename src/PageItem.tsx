/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

import SafeAnchor from './SafeAnchor';
import { useClassNameMapper } from './ThemeProvider';

export interface PageItemProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixPropsWithChildren {
  disabled?: boolean;
  active?: boolean;
  activeLabel?: string;
  href?: string;
}

type PageItem = BsPrefixRefForwardingComponent<'li', PageItemProps>;

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

const PageItem: PageItem = React.forwardRef<HTMLLIElement, PageItemProps>(
  (
    {
      active,
      disabled,
      className,
      style,
      activeLabel,
      children,
      ...props
    }: PageItemProps,
    ref,
  ) => {
    const Component = active || disabled ? 'span' : SafeAnchor;
    const classNames = useClassNameMapper();
    return (
      <li
        ref={ref}
        style={style}
        className={classNames(className, 'page-item', { active, disabled })}
      >
        <Component
          className={classNames('page-link')}
          disabled={disabled}
          {...props}
        >
          {children}
          {active && activeLabel && (
            <span className={classNames('sr-only')}>{activeLabel}</span>
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

function createButton(name: string, defaultValue: ReactNode, label = name) {
  function Button({ children, ...props }: PageItemProps) {
    const classNames = useClassNameMapper();

    return (
      <PageItem {...props}>
        <span aria-hidden="true">{children || defaultValue}</span>
        <span className={classNames('sr-only')}>{label}</span>
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
