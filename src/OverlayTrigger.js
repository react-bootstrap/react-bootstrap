/* eslint-disable max-classes-per-file */
import useMergedRefs from '@restart/hooks/useMergedRefs';
import contains from 'dom-helpers/contains';
import PropTypes from 'prop-types';
import React, { cloneElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import warning from 'warning';
import Overlay from './Overlay';

class RefHolder extends React.Component {
  render() {
    return this.props.children;
  }
}

const normalizeDelay = delay =>
  delay && typeof delay === 'object' ? delay : { show: delay, hide: delay };

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
};

const defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus'],
};

// eslint-disable-next-line react/no-multi-comp
const OverlayTrigger = React.forwardRef(
  (
    {
      trigger,
      overlay,
      children,
      popperConfig = {},
      defaultShow,
      delay: delayProps,
      ...props
    },
    ref,
  ) => {
    const triggerNode = useRef(null);
    const mergedRef = useMergedRefs(ref, triggerNode);
    const _timeout = useRef();
    const _hoverState = useRef();
    const [show, setShow] = useState(!!defaultShow);

    useEffect(() => {
      return () => {
        clearTimeout(_timeout.current);
      };
    }, []);

    const getChildProps = () => React.Children.only(children).props;

    const getTarget = () => ReactDOM.findDOMNode(triggerNode.current);

    const handleShow = () => {
      clearTimeout(_timeout.current);
      _hoverState.current = 'show';

      const delay = normalizeDelay(delayProps);

      if (!delay.show) {
        setShow(true);
        return;
      }

      _timeout.current = setTimeout(() => {
        if (_hoverState.current === 'show') setShow(true);
      }, delay.show);
    };

    const handleHide = () => {
      clearTimeout(_timeout.current);
      _hoverState.current = 'hide';

      const delay = normalizeDelay(delayProps);

      if (!delay.hide) {
        setShow(false);
        return;
      }

      _timeout.current = setTimeout(() => {
        if (_hoverState.current === 'hide') setShow(false);
      }, delay.hide);
    };

    // eslint-disable-next-line no-unused-vars
    const handleFocus = e => {
      const { onFocus } = getChildProps();
      handleShow(e);
      if (onFocus) onFocus(e);
    };

    // eslint-disable-next-line no-unused-vars
    const handleBlur = e => {
      const { onBlur } = getChildProps();
      handleHide(e);
      if (onBlur) onBlur(e);
    };

    const handleClick = e => {
      const { onClick } = getChildProps();

      if (show) setShow(false);
      else setShow(true);

      if (onClick) onClick(e);
    };

    // Simple implementation of mouseEnter and mouseLeave.
    // React's built version is broken: https://github.com/facebook/react/issues/4251
    // for cases when the trigger is disabled and mouseOut/Over can cause flicker
    // moving from one child element to another.
    const handleMouseOverOut = (handler, e, relatedNative) => {
      const target = e.currentTarget;
      const related = e.relatedTarget || e.nativeEvent[relatedNative];

      if ((!related || related !== target) && !contains(target, related)) {
        handler(e);
      }
    };

    const handleMouseOver = e => {
      handleMouseOverOut(handleShow, e, 'fromElement');
    };

    const handleMouseOut = e => handleMouseOverOut(handleHide, e, 'toElement');

    // We add aria-describedby in the case where the overlay is a role="tooltip"
    // for other cases describedby isn't appropriate (e.g. a popover with inputs) so we don't add it.
    const ariaModifier = {
      enabled: true,
      order: 900,
      fn: data => {
        const { popper } = data.instance;
        const target = getTarget();

        if (!show || !target) return data;

        const role = popper.getAttribute('role') || '';
        if (popper.id && role.toLowerCase() === 'tooltip') {
          target.setAttribute('aria-describedby', popper.id);
        }
        return data;
      },
    };

    const child = React.Children.only(children);

    const triggerProps = {};

    let triggers = trigger == null ? [] : [].concat(trigger);

    if (triggers.indexOf('click') !== -1) {
      triggerProps.onClick = handleClick;
    }

    if (triggers.indexOf('focus') !== -1) {
      triggerProps.onFocus = handleShow;
      triggerProps.onBlur = handleHide;
    }

    if (triggers.indexOf('hover') !== -1) {
      warning(
        triggers.length >= 1,
        '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' +
          'visibility of the overlay to just mouse users. Consider also ' +
          'including the `"focus"` trigger so that touch and keyboard only ' +
          'users can see the overlay as well.',
      );
      triggerProps.onMouseOver = handleMouseOver;
      triggerProps.onMouseOut = handleMouseOut;
    }

    return (
      <>
        <RefHolder ref={mergedRef}>
          {cloneElement(child, triggerProps)}
        </RefHolder>
        <Overlay
          {...props}
          popperConfig={{
            ...popperConfig,
            modifiers: {
              ...popperConfig.modifiers,
              ariaModifier,
            },
          }}
          show={show}
          onHide={handleHide}
          target={getTarget}
        >
          {overlay}
        </Overlay>
      </>
    );
  },
);

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
