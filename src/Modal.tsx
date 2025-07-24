import clsx from 'clsx';
import canUseDOM from 'dom-helpers/canUseDOM';
import ownerDocument from 'dom-helpers/ownerDocument';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useEventCallback from '@restart/hooks/useEventCallback';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useWillUnmount from '@restart/hooks/useWillUnmount';
import transitionEnd from 'dom-helpers/transitionEnd';
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import BaseModal, { type ModalHandle } from '@restart/ui/Modal';
import { getSharedManager } from './BootstrapModalManager.js';
import Fade from './Fade.js';
import ModalBody from './ModalBody.js';
import ModalContext from './ModalContext.js';
import ModalDialog from './ModalDialog.js';
import ModalFooter from './ModalFooter.js';
import ModalHeader from './ModalHeader.js';
import ModalTitle from './ModalTitle.js';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider.js';
import type { BaseModalProps } from './types.js';

export interface ModalProps extends BaseModalProps {
  /**
   * @default 'modal'
   */
  bsPrefix?: string | undefined;

  /**
   * Render a large, extra large or small modal.
   * When not provided, the modal is rendered with medium (default) size.
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
   * vertically center the Dialog in the window
   */
  centered?: boolean | undefined;

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName?: string;

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation?: boolean | undefined;

  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName?: string | undefined;

  /**
   * Add an optional extra class name to .modal-content
   */
  contentClassName?: string | undefined;

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   *
   * @default ModalDialog
   */
  dialogAs?: React.ElementType | undefined;

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable?: boolean | undefined;

  [other: string]: any;
}

function DialogTransition(props) {
  return <Fade {...props} timeout={null} />;
}

function BackdropTransition(props) {
  return <Fade {...props} timeout={null} />;
}

const Modal = React.forwardRef<ModalHandle, ModalProps>(
  (
    {
      bsPrefix,
      className,
      style,
      dialogClassName,
      contentClassName,
      children,
      dialogAs: Dialog = ModalDialog,
      'data-bs-theme': dataBsTheme,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,

      /* BaseModal props */

      show = false,
      animation = true,
      backdrop = true,
      keyboard = true,
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
    const [modalStyle, setStyle] = useState({});
    const [animateStaticModal, setAnimateStaticModal] = useState(false);
    const waitingForMouseUpRef = useRef(false);
    const ignoreBackdropClickRef = useRef(false);
    const removeStaticModalAnimationRef = useRef<(() => void) | null>(null);
    const [modal, setModalRef] = useCallbackRef<ModalHandle>();
    const mergedRef = useMergedRefs(ref as any, setModalRef);
    const handleHide = useEventCallback(onHide);
    const isRTL = useIsRTL();

    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');

    const modalContext = useMemo(
      () => ({
        onHide: handleHide,
      }),
      [handleHide],
    );

    function getModalManager() {
      if (propsManager) return propsManager;
      return getSharedManager({ isRTL });
    }

    function updateDialogStyle(node) {
      if (!canUseDOM) return;

      const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;

      const modalIsOverflowing =
        node.scrollHeight > ownerDocument(node).documentElement.clientHeight;

      setStyle({
        paddingRight:
          containerIsOverflowing && !modalIsOverflowing
            ? getScrollbarSize()
            : undefined,
        paddingLeft:
          !containerIsOverflowing && modalIsOverflowing
            ? getScrollbarSize()
            : undefined,
      });
    }

    const handleWindowResize = useEventCallback(() => {
      if (modal) {
        updateDialogStyle(modal.dialog);
      }
    });

    useWillUnmount(() => {
      window.removeEventListener('resize', handleWindowResize);
      removeStaticModalAnimationRef.current?.();
    });

    // We prevent the modal from closing during a drag by detecting where the
    // click originates from. If it starts in the modal and then ends outside
    // don't close.
    const handleDialogMouseDown = () => {
      waitingForMouseUpRef.current = true;
    };

    const handleMouseUp = (e) => {
      if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
        ignoreBackdropClickRef.current = true;
      }
      waitingForMouseUpRef.current = false;
    };

    const handleStaticModalAnimation = () => {
      setAnimateStaticModal(true);
      removeStaticModalAnimationRef.current = transitionEnd(
        modal!.dialog as any,
        () => {
          setAnimateStaticModal(false);
        },
      );
    };

    const handleStaticBackdropClick = (e) => {
      if (e.target !== e.currentTarget) {
        return;
      }

      handleStaticModalAnimation();
    };

    const handleClick = (e) => {
      if (backdrop === 'static') {
        handleStaticBackdropClick(e);
        return;
      }

      if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
        ignoreBackdropClickRef.current = false;
        return;
      }

      onHide?.();
    };

    const handleEscapeKeyDown = (e) => {
      if (keyboard) {
        onEscapeKeyDown?.(e);
      } else {
        // Call preventDefault to stop modal from closing in @restart/ui.
        e.preventDefault();

        if (backdrop === 'static') {
          // Play static modal animation.
          handleStaticModalAnimation();
        }
      }
    };

    const handleEnter = (node, isAppearing) => {
      if (node) {
        updateDialogStyle(node);
      }

      onEnter?.(node, isAppearing);
    };

    const handleExit = (node) => {
      removeStaticModalAnimationRef.current?.();
      onExit?.(node);
    };

    const handleEntering = (node, isAppearing) => {
      onEntering?.(node, isAppearing);

      // FIXME: This should work even when animation is disabled.
      window.addEventListener('resize', handleWindowResize);
    };

    const handleExited = (node) => {
      if (node) node.style.display = ''; // RHL removes it sometimes
      onExited?.(node);

      // FIXME: This should work even when animation is disabled.
      window.removeEventListener('resize', handleWindowResize);
    };

    const renderBackdrop = useCallback(
      (backdropProps) => (
        <div
          {...backdropProps}
          className={clsx(
            `${bsPrefix}-backdrop`,
            backdropClassName,
            !animation && 'show',
          )}
        />
      ),
      [animation, backdropClassName, bsPrefix],
    );

    const baseModalStyle = { ...style, ...modalStyle };

    // If `display` is not set to block, autoFocus inside the modal fails
    // https://github.com/react-bootstrap/react-bootstrap/issues/5102
    baseModalStyle.display = 'block';

    const renderDialog = (dialogProps) => (
      <div
        role="dialog"
        {...dialogProps}
        style={baseModalStyle}
        className={clsx(
          className,
          bsPrefix,
          animateStaticModal && `${bsPrefix}-static`,
          !animation && 'show',
        )}
        onClick={backdrop ? handleClick : undefined}
        onMouseUp={handleMouseUp}
        data-bs-theme={dataBsTheme}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        <Dialog
          {...props}
          onMouseDown={handleDialogMouseDown}
          className={dialogClassName}
          contentClassName={contentClassName}
        >
          {children}
        </Dialog>
      </div>
    );

    return (
      <ModalContext.Provider value={modalContext}>
        <BaseModal
          show={show}
          ref={mergedRef}
          backdrop={backdrop}
          container={container}
          keyboard // Always set true - see handleEscapeKeyDown
          autoFocus={autoFocus}
          enforceFocus={enforceFocus}
          restoreFocus={restoreFocus}
          restoreFocusOptions={restoreFocusOptions}
          onEscapeKeyDown={handleEscapeKeyDown}
          onShow={onShow}
          onHide={onHide}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={onEntered}
          onExit={handleExit}
          onExiting={onExiting}
          onExited={handleExited}
          manager={getModalManager()}
          transition={animation ? DialogTransition : undefined}
          backdropTransition={animation ? BackdropTransition : undefined}
          renderBackdrop={renderBackdrop}
          renderDialog={renderDialog}
        />
      </ModalContext.Provider>
    );
  },
);

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150,
});
