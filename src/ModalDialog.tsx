import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ModalDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'modal'
   */
  bsPrefix?: string | undefined;

  /**
   * Render a large, extra large or small modal.
   */
  size?: 'sm' | 'lg' | 'xl' | undefined;

  /**
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   */
  fullscreen?:
    | true
    | string
    | 'sm-down'
    | 'md-down'
    | 'lg-down'
    | 'xl-down'
    | 'xxl-down'
    | undefined;

  /**
   * Specify whether the Component should be vertically centered
   */
  centered?: boolean | undefined;

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable?: boolean | undefined;

  /**
   * Additional class names for the modal content element.
   */
  contentClassName?: string;
}

const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  (
    {
      bsPrefix,
      className,
      contentClassName,
      centered,
      size,
      fullscreen,
      children,
      scrollable,
      ...props
    }: ModalDialogProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
    const dialogClass = `${bsPrefix}-dialog`;

    const fullScreenClass =
      typeof fullscreen === 'string'
        ? `${bsPrefix}-fullscreen-${fullscreen}`
        : `${bsPrefix}-fullscreen`;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          dialogClass,
          className,
          size && `${bsPrefix}-${size}`,
          centered && `${dialogClass}-centered`,
          scrollable && `${dialogClass}-scrollable`,
          fullscreen && fullScreenClass,
        )}
      >
        <div className={classNames(`${bsPrefix}-content`, contentClassName)}>
          {children}
        </div>
      </div>
    );
  },
);

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
