import classNames from 'classnames';
import useEventCallback from '@restart/hooks/useEventCallback';
import * as React from 'react';
import { useCallback, useMemo, useRef } from 'react';
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
      ...props
    },
    ref,
  ) => {
    const modalManager = useRef<BootstrapModalManager>(null);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
    const handleHide = useEventCallback(onHide);

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
      <ModalContext.Provider value={modalContext}>
        <BaseModal
          show={show}
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
          mountDialogOnEnter={false}
          unmountDialogOnExit={false}
          portal={false}
        />
      </ModalContext.Provider>
    );
  },
);

Offcanvas.displayName = 'Offcanvas';

export default Object.assign(Offcanvas, {
  Body: OffcanvasBody,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
});
