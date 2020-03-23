import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';

import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';
import { useBootstrapPrefix } from './ThemeProvider';
import Fade from './Fade';
import CloseButton from './CloseButton';
import SafeAnchor from './SafeAnchor';

const propTypes = {
  /**
   * @default 'alert'
   */
  bsPrefix: PropTypes.string,

  /**
   * The Alert visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
   */
  variant: PropTypes.string,

  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the Alert.
   */
  dismissible: PropTypes.bool,

  /**
   * Controls the visual state of the Alert.
   *
   * @controllable onClose
   */
  show: PropTypes.bool,

  /**
   * Callback fired when alert is closed.
   *
   * @controllable show
   */
  onClose: PropTypes.func,

  /**
   * Sets the text for alert close button.
   */
  closeLabel: PropTypes.string,

  /** A `react-transition-group` Transition component used to animate the Alert on dismissal. */
  transition: elementType,
};

const defaultProps = {
  show: true,
  transition: Fade,
  closeLabel: 'Close alert',
};

const controllables = {
  show: 'onClose',
};

const Alert = React.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show,
    closeLabel,
    className,
    children,
    variant,
    onClose,
    dismissible,
    transition: Transition,
    ...props
  } = useUncontrolled(uncontrolledProps, controllables);

  const prefix = useBootstrapPrefix(bsPrefix, 'alert');
  const handleClose = useEventCallback((e) => {
    onClose(false, e);
  });

  const alert = (
    <div
      role="alert"
      {...(Transition ? props : undefined)}
      ref={ref}
      className={classNames(
        className,
        prefix,
        variant && `${prefix}-${variant}`,
        dismissible && `${prefix}-dismissible`,
      )}
    >
      {dismissible && <CloseButton onClick={handleClose} label={closeLabel} />}
      {children}
    </div>
  );

  if (!Transition) return show ? alert : null;

  return (
    <Transition unmountOnExit {...props} in={show}>
      {alert}
    </Transition>
  );
});

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

Alert.Link = createWithBsPrefix('alert-link', {
  Component: SafeAnchor,
});

Alert.Heading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4,
});

export default Alert;
