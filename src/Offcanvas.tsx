import classNames from 'classnames';
import useBreakpoint from '@restart/hooks/useBreakpoint';
import useEventCallback from '@restart/hooks/useEventCallback';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseModal, { type ModalHandle } from '@restart/ui/Modal';
import Fade from './Fade';
import OffcanvasBody from './OffcanvasBody';
import OffcanvasToggling from './OffcanvasToggling';
import ModalContext from './ModalContext';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import { useBootstrapPrefix } from './ThemeProvider';
import BootstrapModalManager, {
  getSharedManager,
} from './BootstrapModalManager';
import type { BaseModalProps } from './types';

export type OffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom';

export interface OffcanvasProps extends BaseModalProps {
  /**
   * @default 'offcanvas'
   */
  bsPrefix?: string | undefined;

  /**
   * Add an optional extra class name to .offcanvas-backdrop.
   */
  backdropClassName?: string | undefined;

  /**
   * Allow body scrolling while offcanvas is open.
   */
  scroll?: boolean | undefined;

  /**
   * Which side of the viewport the offcanvas will appear from.
   */
  placement?: OffcanvasPlacement | undefined;

  /**
   * Hide content outside the viewport from a specified breakpoint and down.
   */
  responsive?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string | undefined;

  /**
   * For internal use to render static node from NavbarOffcanvas.
   *
   * @private
   */
  renderStaticNode?: boolean | undefined;

  [other: string]: any;
}

function DialogTransition(props) {
  return <OffcanvasToggling {...props} />;
}

function BackdropTransition(props) {
  return <Fade {...props} />;
}

const Offcanvas = React.forwardRef<ModalHandle, OffcanvasProps>(
  (
    {
      bsPrefix,
      className,
      children,
      'aria-labelledby': ariaLabelledby,
      placement = 'start',
      responsive,

      /* BaseModal props */

      show = false,
      backdrop = true,
      keyboard = true,
      scroll = false,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus = true,
      enforceFocus = true,
      restoreFocus = true,
      restoreFocusOptions,
      onEntered,
      onExit,
      onExiting,
      onEnter,
      onEntering,
      onExited,
      backdropClassName,
      manager: propsManager,
      renderStaticNode = false,
      ...props
    },
    ref,
  ) => {
    const modalManager = useRef<BootstrapModalManager>(null);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleHide = useEventCallback(onHide);

    const hideResponsiveOffcanvas = useBreakpoint(
      (responsive as any) || 'xs',
      'up',
    );

    useEffect(() => {
      // Handles the case where screen is resized while the responsive
      // offcanvas is shown. If `responsive` not provided, just use `show`.
      setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
    }, [show, responsive, hideResponsiveOffcanvas]);

    const modalContext = useMemo(
      () => ({
        onHide: handleHide,
      }),
      [handleHide],
    );

    function getModalManager() {
      if (propsManager) return propsManager;
      if (scroll) {
        // Have to use a different modal manager since the shared
        // one handles overflow.
        if (!modalManager.current)
          modalManager.current = new BootstrapModalManager({
            handleContainerOverflow: false,
          });
        return modalManager.current;
      }

      return getSharedManager();
    }

    const handleEnter = (node, ...args) => {
      if (node) node.style.visibility = 'visible';
      onEnter?.(node, ...args);
    };

    const handleExited = (node, ...args) => {
      if (node) node.style.visibility = '';
      onExited?.(...args);
    };

    const renderBackdrop = useCallback(
      (backdropProps) => (
        <div
          {...backdropProps}
          className={classNames(`${bsPrefix}-backdrop`, backdropClassName)}
        />
      ),
      [backdropClassName, bsPrefix],
    );

    const renderDialog = (dialogProps) => (
      <div
        {...dialogProps}
        {...props}
        className={classNames(
          className,
          responsive ? `${bsPrefix}-${responsive}` : bsPrefix,
          `${bsPrefix}-${placement}`,
        )}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </div>
    );

    return (
      <>
        {/* 
            Only render static elements when offcanvas isn't shown so we 
            don't duplicate elements.

            TODO: Should follow bootstrap behavior and don't unmount children
            when show={false} in BaseModal. Will do this next major version.
          */}
        {!showOffcanvas && (responsive || renderStaticNode) && renderDialog({})}

        <ModalContext.Provider value={modalContext}>
          <BaseModal
            show={showOffcanvas}
            ref={ref}
            backdrop={backdrop}
            container={container}
            keyboard={keyboard}
            autoFocus={autoFocus}
            enforceFocus={enforceFocus && !scroll}
            restoreFocus={restoreFocus}
            restoreFocusOptions={restoreFocusOptions}
            onEscapeKeyDown={onEscapeKeyDown}
            onShow={onShow}
            onHide={handleHide}
            onEnter={handleEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}
            onExited={handleExited}
            manager={getModalManager()}
            transition={DialogTransition}
            backdropTransition={BackdropTransition}
            renderBackdrop={renderBackdrop}
            renderDialog={renderDialog}
          />
        </ModalContext.Provider>
      </>
    );
  },
);

Offcanvas.displayName = 'Offcanvas';

export default Object.assign(Offcanvas, {
  Body: OffcanvasBody,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
});
