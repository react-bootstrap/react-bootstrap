import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useBootstrapPrefix } from './ThemeProvider';
import Fade from './Fade';
import CloseButton from './CloseButton';
import { Variant } from './types';
import divWithClassName from './divWithClassName';
import createWithBsPrefix from './createWithBsPrefix';
import SafeAnchor from './SafeAnchor';
import { TransitionType } from './helpers';

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
  bsPrefix?: string;
  variant?: Variant;
  dismissible?: boolean;
  show?: boolean;
  onClose?: (a: any, b: any) => void;
  closeLabel?: string;
  transition?: TransitionType;
}

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

const AlertHeading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4,
});

const AlertLink = createWithBsPrefix('alert-link', {
  Component: SafeAnchor,
});

type Alert = React.ForwardRefExoticComponent<AlertProps> & {
  Link: typeof AlertLink;
  Heading: typeof AlertHeading;
};

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

  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
};

const defaultProps = {
  show: true,
  transition: Fade,
  closeLabel: 'Close alert',
};

const Alert = (React.forwardRef<HTMLDivElement, AlertProps>(
  (uncontrolledProps: AlertProps, ref) => {
    const {
      bsPrefix,
      show,
      closeLabel,
      className,
      children,
      variant,
      onClose,
      dismissible,
      transition,
      ...props
    } = useUncontrolled(uncontrolledProps, {
      show: 'onClose',
    });

    const prefix = useBootstrapPrefix(bsPrefix, 'alert');
    const handleClose = useEventCallback((e) => {
      if (onClose) {
        onClose(false, e);
      }
    });
    const Transition = transition === true ? Fade : transition;
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
        {dismissible && (
          <CloseButton onClick={handleClose} label={closeLabel} />
        )}
        {children}
      </div>
    );

    if (!Transition) return show ? alert : null;

    return (
      <Transition unmountOnExit {...props} ref={undefined} in={show}>
        {alert}
      </Transition>
    );
  },
) as unknown) as Alert;

Alert.displayName = 'Alert';
Alert.defaultProps = defaultProps as any;
Alert.propTypes = propTypes;
Alert.Link = AlertLink;
Alert.Heading = AlertHeading;

export default Alert;
