/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ReactNode } from 'react';
import Anchor from '@restart/ui/Anchor';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface PageItemProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  disabled?: boolean;
  active?: boolean;
  activeLabel?: string;
  href?: string;
}

const propTypes = {
  /** Disables the PageItem */
  disabled: PropTypes.bool,

  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: PropTypes.bool,

  /** An accessible label indicating the active state. */
  activeLabel: PropTypes.string,

  /** The HTML href attribute for the `PageItem`. */
  href: PropTypes.string,

  /** A callback function for when this component is clicked. */
  onClick: PropTypes.func,
};

const PageItem: BsPrefixRefForwardingComponent<'li', PageItemProps> =
  React.forwardRef<HTMLLIElement, PageItemProps>(
    (
      {
        active = false,
        disabled = false,
        className,
        style,
        activeLabel = '(current)',
        children,
        ...props
      }: PageItemProps,
      ref,
    ) => {
      const Component = active || disabled ? 'span' : Anchor;
      return (
        <li
          ref={ref}
          style={style}
          className={classNames(className, 'page-item', { active, disabled })}
        >
          <Component className="page-link" {...props}>
            {children}
            {active && activeLabel && (
              <span className="visually-hidden">{activeLabel}</span>
            )}
          </Component>
        </li>
      );
    },
  );

PageItem.propTypes = propTypes;
PageItem.displayName = 'PageItem';

export default PageItem;

function createButton(name: string, defaultValue: ReactNode, label = name) {
  const Button = React.forwardRef(
    ({ children, ...props }: PageItemProps, ref) => (
      <PageItem {...props} ref={ref}>
        <span aria-hidden="true">{children || defaultValue}</span>
        <span className="visually-hidden">{label}</span>
      </PageItem>
    ),
  );

  Button.displayName = name;

  return Button;
}

export const First = createButton('First', '«');
export const Prev = createButton('Prev', '‹', 'Previous');
export const Ellipsis = createButton('Ellipsis', '…', 'More');
export const Next = createButton('Next', '›');
export const Last = createButton('Last', '»');
