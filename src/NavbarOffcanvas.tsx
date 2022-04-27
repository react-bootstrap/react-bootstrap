import * as React from 'react';
import { useContext } from 'react';
import useBreakpoint from '@restart/hooks/useBreakpoint';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import Offcanvas, { OffcanvasProps } from './Offcanvas';
import NavbarContext from './NavbarContext';

export type NavbarOffcanvasProps = Omit<OffcanvasProps, 'show'>;

const NavbarOffcanvas = React.forwardRef<HTMLDivElement, NavbarOffcanvasProps>(
  (
    {
      className,
      bsPrefix,
      backdrop,
      backdropClassName,
      keyboard,
      scroll,
      placement,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onShow,
      onHide,
      onEscapeKeyDown,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    },
    ref,
  ) => {
    const context = useContext(NavbarContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
    const hasExpandProp = typeof context?.expand === 'string';
    const shouldExpand = useBreakpoint(
      (hasExpandProp ? context.expand : 'xs') as any,
      'up',
    );

    return hasExpandProp && shouldExpand ? (
      <div
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix, `${bsPrefix}-${placement}`)}
      />
    ) : (
      <Offcanvas
        ref={ref}
        show={!!context?.expanded}
        bsPrefix={bsPrefix}
        backdrop={backdrop}
        backdropClassName={backdropClassName}
        keyboard={keyboard}
        scroll={scroll}
        placement={placement}
        autoFocus={autoFocus}
        enforceFocus={enforceFocus}
        restoreFocus={restoreFocus}
        restoreFocusOptions={restoreFocusOptions}
        onShow={onShow}
        onHide={onHide}
        onEscapeKeyDown={onEscapeKeyDown}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        {...props}
      />
    );
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
