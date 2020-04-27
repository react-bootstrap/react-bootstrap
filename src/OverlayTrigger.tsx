import contains from 'dom-helpers/contains';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useRef, useState } from 'react';
import useTimeout from '@restart/hooks/useTimeout';
import safeFindDOMNode from 'react-overlays/safeFindDOMNode';
import warning from 'warning';
import Overlay, { OverlayChildren, OverlayProps } from './Overlay';

export type OverlayTriggerType = 'hover' | 'click' | 'focus';

export interface OverlayTriggerProps
  extends Omit<OverlayProps, 'children' | 'target'> {
  children: React.ReactNode;
  trigger?: OverlayTriggerType | OverlayTriggerType[];
  delay?: number | { show: number; hide: number };
  defaultShow?: boolean;
  flip?: boolean;
  overlay: OverlayChildren;

  target?: never;
  onHide?: never;
  show?: never;
}

// declare class OverlayTrigger extends React.Component<OverlayTriggerProps> {}

class RefHolder extends React.Component {
  render() {
    return this.props.children;
  }
}

function normalizeDelay(delay) {
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
function handleMouseOverOut(handler, e, relatedNative) {
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !contains(target, related)) {
    handler(e);
  }
}

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);

const propTypes = {
  children: PropTypes.element.isRequired,

  /**
   * Specify which action or actions trigger Overlay visibility
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
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultShow: PropTypes.bool,
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
   * @private
   */
  show: PropTypes.oneOf([null]),

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
  defaultShow,
  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}: OverlayTriggerProps) {
  const triggerNodeRef = useRef(null);
  const timeout = useTimeout();
  const hoverStateRef = useRef<string>('');
  const [show, setShow] = useState(!!defaultShow);

  const delay = normalizeDelay(propsDelay);

  const child = React.Children.only(children);
  // @ts-ignore
  const { onFocus, onBlur, onClick } = child.props;

  const getTarget = useCallback(
    () => safeFindDOMNode(triggerNodeRef.current),
    [],
  );

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
  }, [delay.show, timeout]);

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
  }, [delay.hide, timeout]);

  const handleFocus = useCallback(
    (e) => {
      handleShow();
      if (onFocus) onFocus(e);
    },
    [handleShow, onFocus],
  );

  const handleBlur = useCallback(
    (e) => {
      handleHide();
      if (onBlur) onBlur(e);
    },
    [handleHide, onBlur],
  );

  const handleClick = useCallback(
    (e) => {
      setShow((prevShow) => !prevShow);
      if (onClick) onClick(e);
    },
    [onClick],
  );

  const handleMouseOver = useCallback(
    (e) => {
      handleMouseOverOut(handleShow, e, 'fromElement');
    },
    [handleShow],
  );

  const handleMouseOut = useCallback(
    (e) => {
      handleMouseOverOut(handleHide, e, 'toElement');
    },
    [handleHide],
  );

  // We add aria-describedby in the case where the overlay is a role="tooltip"
  // for other cases describedby isn't appropriate (e.g. a popover with inputs) so we don't add it.
  const ariaModifier = {
    name: 'ariaDescribedBy',
    enabled: true,
    phase: 'afterWrite',
    effect: ({ state }) => {
      return () => {
        state.elements.reference.removeAttribute('aria-describedby');
      };
    },
    fn: ({ state }) => {
      const { popper, reference } = state.elements;

      if (!show || !reference) return;

      const role = popper.getAttribute('role') || '';
      if (popper.id && role.toLowerCase() === 'tooltip') {
        reference.setAttribute('aria-describedby', popper.id);
      }
    },
  };

  const triggers: string[] = trigger == null ? [] : [].concat(trigger as any);
  const triggerProps: any = {};

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

  // @ts-ignore
  const modifiers = [ariaModifier].concat(popperConfig.modifiers || []);
  return (
    <>
      <RefHolder ref={triggerNodeRef}>
        {cloneElement(child as any, triggerProps)}
      </RefHolder>
      <Overlay
        {...props}
        popperConfig={{
          ...popperConfig,
          modifiers,
        }}
        show={show}
        onHide={handleHide}
        target={getTarget as any}
        placement={placement}
        flip={flip}
      >
        {overlay}
      </Overlay>
    </>
  );
}

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
