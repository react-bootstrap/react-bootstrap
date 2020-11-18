import classNames from 'classnames';
import addEventListener from 'dom-helpers/addEventListener';
import canUseDOM from 'dom-helpers/canUseDOM';
import ownerDocument from 'dom-helpers/ownerDocument';
import removeEventListener from 'dom-helpers/removeEventListener';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useEventCallback from '@restart/hooks/useEventCallback';
import useWillUnmount from '@restart/hooks/useWillUnmount';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BaseModal, { ModalProps as BaseModalProps } from 'react-overlays/Modal';
import warning from 'warning';
import BootstrapModalManager from './BootstrapModalManager';
import Fade from './Fade';
import ModalBody from './ModalBody';
import ModalContext from './ModalContext';
import ModalDialog from './ModalDialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { BsPrefixRefForwardingComponent } from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ModalProps
  extends Omit<
    BaseModalProps,
    | 'role'
    | 'renderBackdrop'
    | 'renderDialog'
    | 'transition'
    | 'backdropTransition'
  > {
  size?: 'sm' | 'lg' | 'xl';
  bsPrefix?: string;
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  contentClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
}

type Modal = BsPrefixRefForwardingComponent<'div', ModalProps> & {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Footer: typeof ModalFooter;
  Dialog: typeof ModalDialog;
  TRANSITION_DURATION: number;
  BACKDROP_TRANSITION_DURATION: number;
};

let manager;

const propTypes = {
  /**
   * @default 'modal'
   */
  bsPrefix: PropTypes.string,

  /**
   * Render a large, extra large or small modal.
   * When not provided, the modal is rendered with medium (default) size.
   * @type ('sm'|'lg','xl')
   */
  size: PropTypes.string,

  /**
   * vertically center the Dialog in the window
   */
  centered: PropTypes.bool,

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: PropTypes.oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: PropTypes.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: PropTypes.bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: PropTypes.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: PropTypes.bool,

  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: PropTypes.string,

  /**
   * Add an optional extra class name to .modal-content
   */
  contentClassName: PropTypes.string,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogAs: PropTypes.elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: PropTypes.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: PropTypes.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: PropTypes.bool,

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: PropTypes.shape({
    preventScroll: PropTypes.bool,
  }),

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: PropTypes.func,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: PropTypes.func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: PropTypes.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: PropTypes.object,

  /**
   * @private
   */
  container: PropTypes.any,

  'aria-labelledby': PropTypes.any,
};

const defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return <Fade {...props} />;
}

function BackdropTransition(props) {
  return <Fade {...props} />;
}

/* eslint-enable no-use-before-define */

const Modal: Modal = (React.forwardRef(
  (
    {
      bsPrefix,
      className,
      style,
      dialogClassName,
      contentClassName,
      children,
      dialogAs: Dialog,
      'aria-labelledby': ariaLabelledby,

      /* BaseModal props */

      show,
      animation,
      backdrop,
      keyboard,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus,
      enforceFocus,
      restoreFocus,
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
    }: ModalProps,
    ref,
  ) => {
    const [modalStyle, setStyle] = useState({});
    const [animateStaticModal, setAnimateStaticModal] = useState(false);
    const waitingForMouseUpRef = useRef(false);
    const ignoreBackdropClickRef = useRef(false);
    const removeStaticModalAnimationRef = useRef<(() => void) | null>(null);

    // TODO: what's this type
    const [modal, setModalRef] = useCallbackRef<{ dialog: any }>();
    const handleHide = useEventCallback(onHide);

    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');

    useImperativeHandle(
      ref,
      () => ({
        get _modal() {
          warning(
            false,
            'Accessing `_modal` is not supported and will be removed in a future release',
          );
          return modal;
        },
      }),
      [modal],
    );

    const modalContext = useMemo(
      () => ({
        onHide: handleHide,
      }),
      [handleHide],
    );

    function getModalManager() {
      if (propsManager) return propsManager;
      if (!manager) manager = new BootstrapModalManager();
      return manager;
    }

    function updateDialogStyle(node) {
      if (!canUseDOM) return;

      const containerIsOverflowing = getModalManager().isContainerOverflowing(
        modal,
      );

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
      removeEventListener(window as any, 'resize', handleWindowResize);

      if (removeStaticModalAnimationRef.current) {
        removeStaticModalAnimationRef.current();
      }
    });

    // We prevent the modal from closing during a drag by detecting where the
    // the click originates from. If it starts in the modal and then ends outside
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
        modal!.dialog,
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

      onHide();
    };

    const handleEscapeKeyDown = (e) => {
      if (!keyboard && backdrop === 'static') {
        // Call preventDefault to stop modal from closing in react-overlays,
        // then play our animation.
        e.preventDefault();
        handleStaticModalAnimation();
      } else if (keyboard && onEscapeKeyDown) {
        onEscapeKeyDown(e);
      }
    };

    const handleEnter = (node, ...args) => {
      if (node) {
        node.style.display = 'block';
        updateDialogStyle(node);
      }

      if (onEnter) onEnter(node, ...args);
    };

    const handleExit = (node, ...args) => {
      if (removeStaticModalAnimationRef.current) {
        removeStaticModalAnimationRef.current();
      }

      if (onExit) onExit(node, ...args);
    };

    const handleEntering = (node, ...args) => {
      if (onEntering) onEntering(node, ...args);

      // FIXME: This should work even when animation is disabled.
      addEventListener(window as any, 'resize', handleWindowResize);
    };

    const handleExited = (node, ...args) => {
      if (node) node.style.display = ''; // RHL removes it sometimes
      if (onExited) onExited(...args);

      // FIXME: This should work even when animation is disabled.
      removeEventListener(window as any, 'resize', handleWindowResize);
    };

    const renderBackdrop = useCallback(
      (backdropProps) => (
        <div
          {...backdropProps}
          className={classNames(
            `${bsPrefix}-backdrop`,
            backdropClassName,
            !animation && 'show',
          )}
        />
      ),
      [animation, backdropClassName, bsPrefix],
    );

    const baseModalStyle = { ...style, ...modalStyle };

    // Sets `display` always block when `animation` is false
    if (!animation) {
      baseModalStyle.display = 'block';
    }

    const renderDialog = (dialogProps) => (
      <div
        role="dialog"
        {...dialogProps}
        style={baseModalStyle}
        className={classNames(
          className,
          bsPrefix,
          animateStaticModal && `${bsPrefix}-static`,
        )}
        onClick={backdrop ? handleClick : undefined}
        onMouseUp={handleMouseUp}
        aria-labelledby={ariaLabelledby}
      >
        {/*
        // @ts-ignore */}
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
          ref={setModalRef}
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
          containerClassName={`${bsPrefix}-open`}
          transition={animation ? DialogTransition : undefined}
          backdropTransition={animation ? BackdropTransition : undefined}
          renderBackdrop={renderBackdrop}
          renderDialog={renderDialog}
        />
      </ModalContext.Provider>
    );
  },
) as unknown) as Modal;

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default Modal;
