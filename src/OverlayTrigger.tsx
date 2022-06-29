import contains from 'dom-helpers/contains';
import PropTypes from 'prop-types';
import * as React from 'react';
import { cloneElement, useCallback, useRef } from 'react';
import useTimeout from '@restart/hooks/useTimeout';
import warning from 'warning';
import { useUncontrolledProp } from 'uncontrollable';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import Overlay, { OverlayChildren, OverlayProps } from './Overlay';
import safeFindDOMNode from './safeFindDOMNode';

export type OverlayTriggerType = 'hover' | 'click' | 'focus';

export type OverlayDelay = number | { show: number; hide: number };

export type OverlayInjectedProps = {
  onFocus?: (...args: any[]) => any;
};

export type OverlayTriggerRenderProps = OverlayInjectedProps & {
  ref: React.Ref<any>;
};

export interface OverlayTriggerProps
  extends Omit<OverlayProps, 'children' | 'target'> {
  children:
    | React.ReactElement
    | ((props: OverlayTriggerRenderProps) => React.ReactNode);
  trigger?: OverlayTriggerType | OverlayTriggerType[];
  delay?: OverlayDelay;
  show?: boolean;
  defaultShow?: boolean;
  onToggle?: (nextShow: boolean) => void;
  flip?: boolean;
  overlay: OverlayChildren;

  target?: never;
  onHide?: never;
}

function normalizeDelay(delay?: OverlayDelay) {
  return delay && typeof delay === 'object'
    ? delay
    : {
        show: delay,
        hide: delay,
      };
}

// Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.
function handleMouseOverOut(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  handler: (...args: [React.MouseEvent, ...any[]]) => any,
  args: [React.MouseEvent, ...any[]],
  relatedNative: 'fromElement' | 'toElement',
) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !contains(target, related)) {
    handler(...args);
  }
}

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,

  /**
   * Specify which action or actions trigger Overlay visibility
   *
   * The `click` trigger ignores the configured `delay`.
   *
   * @type {'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}
   */
  trigger: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number,
    }),
  ]),

  /**
   * The visibility of the Overlay. `show` is a _controlled_ prop so should be paired
   * with `onToggle` to avoid breaking user interactions.
   *
   * Manually toggling `show` does **not** wait for `delay` to change the visibility.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * The initial visibility state of the Overlay.
   */
  defaultShow: PropTypes.bool,

  /**
   * A callback that fires when the user triggers a change in tooltip visibility.
   *
   * `onToggle` is called with the desired next `show`, and generally should be passed
   * back to the `show` prop. `onToggle` fires _after_ the configured `delay`
   *
   * @controllable `show`
   */
  onToggle: PropTypes.func,

  /**
    The initial flip state of the Overlay.
   */
  flip: PropTypes.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.element.isRequired]),

  /**
   * A Popper.js config object passed to the the underlying popper instance.
   */
  popperConfig: PropTypes.object,

  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: PropTypes.oneOf([null]),

  /**
   * @private
   */
  onHide: PropTypes.oneOf([null]),

  /**
   * The placement of the Overlay in relation to it's `target`.
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
};

const defaultProps = {
  defaultShow: false,
  trigger: ['hover', 'focus'],
};

function OverlayTrigger({
  trigger,
  overlay,
  children,
  popperConfig = {},

  show: propsShow,
  defaultShow = false,
  onToggle,

  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}: OverlayTriggerProps) {
  const triggerNodeRef = useRef(null);
  const mergedRef = useMergedRefs<unknown>(
    triggerNodeRef,
    (children as any).ref,
  );
  const timeout = useTimeout();
  const hoverStateRef = useRef<string>('');

  const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle);

  const delay = normalizeDelay(propsDelay);

  const { onFocus, onBlur, onClick } =
    typeof children !== 'function'
      ? React.Children.only(children).props
      : ({} as any);

  const attachRef = (r: React.ComponentClass | Element | null | undefined) => {
    mergedRef(safeFindDOMNode(r));
  };

  const handleShow = useCallback(() => {
    timeout.clear();
    hoverStateRef.current = 'show';

    if (!delay.show) {
      setShow(true);
      return;
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);

  const handleHide = useCallback(() => {
    timeout.clear();
    hoverStateRef.current = 'hide';

    if (!delay.hide) {
      setShow(false);
      return;
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);

  const handleFocus = useCallback(
    (...args: any[]) => {
      handleShow();
      onFocus?.(...args);
    },
    [handleShow, onFocus],
  );

  const handleBlur = useCallback(
    (...args: any[]) => {
      handleHide();
      onBlur?.(...args);
    },
    [handleHide, onBlur],
  );

  const handleClick = useCallback(
    (...args: any[]) => {
      setShow(!show);
      onClick?.(...args);
    },
    [onClick, setShow, show],
  );

  const handleMouseOver = useCallback(
    (...args: [React.MouseEvent, ...any[]]) => {
      handleMouseOverOut(handleShow, args, 'fromElement');
    },
    [handleShow],
  );

  const handleMouseOut = useCallback(
    (...args: [React.MouseEvent, ...any[]]) => {
      handleMouseOverOut(handleHide, args, 'toElement');
    },
    [handleHide],
  );

  const triggers: string[] = trigger == null ? [] : [].concat(trigger as any);
  const triggerProps: any = {
    ref: attachRef,
  };

  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }

  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }

  if (triggers.indexOf('hover') !== -1) {
    warning(
      triggers.length > 1,
      '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.',
    );
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }

  return (
    <>
      {typeof children === 'function'
        ? children(triggerProps)
        : cloneElement(children, triggerProps)}
      <Overlay
        {...props}
        show={show}
        onHide={handleHide}
        flip={flip}
        placement={placement}
        popperConfig={popperConfig}
        target={triggerNodeRef.current}
      >
        {overlay}
      </Overlay>
    </>
  );
}

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
