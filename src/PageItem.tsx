import classNames from 'classnames';
import * as React from 'react';
import { ReactNode } from 'react';
import Anchor from '@restart/ui/Anchor';
import { DynamicRefForwardingComponent } from '@restart/ui/types';

export interface PageItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * Disables the PageItem
   */
  disabled?: boolean | undefined;

  /**
   * Styles PageItem as active, and renders a `<span>` instead of an `<a>`.
   */
  active?: boolean | undefined;

  /**
   * An accessible label indicating the active state.
   */
  activeLabel?: string | undefined;

  /**
   * The HTML href attribute for the `PageItem`.
   */
  href?: string | undefined;

  /**
   * Custom style for the inner component of the PageItem
   */
  linkStyle?: React.CSSProperties | undefined;

  /**
   * Custom className for the inner component of the PageItem
   */
  linkClassName?: string | undefined;
}

const PageItem: DynamicRefForwardingComponent<'li', PageItemProps> =
  React.forwardRef<HTMLLIElement, PageItemProps>(
    (
      {
        active = false,
        disabled = false,
        className,
        style,
        activeLabel = '(current)',
        children,
        linkStyle,
        linkClassName,
        as = Anchor,
        ...props
      }: PageItemProps,
      ref,
    ) => {
      const Component = active || disabled ? 'span' : as;
      return (
        <li
          ref={ref}
          style={style}
          className={classNames(className, 'page-item', { active, disabled })}
        >
          <Component
            className={classNames('page-link', linkClassName)}
            style={linkStyle}
            {...props}
          >
            {children}
            {active && activeLabel && (
              <span className="visually-hidden">{activeLabel}</span>
            )}
          </Component>
        </li>
      );
    },
  );

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
