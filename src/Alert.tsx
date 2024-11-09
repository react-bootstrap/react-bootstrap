import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useBootstrapPrefix } from './ThemeProvider';
import AlertHeading from './AlertHeading';
import AlertLink from './AlertLink';
import Fade from './Fade';
import CloseButton, { CloseButtonVariant } from './CloseButton';
import { Variant } from './types';
import { TransitionType } from './helpers';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  bsPrefix?: string;
  variant?: Variant;
  dismissible?: boolean;
  show?: boolean;
  onClose?: (a: any, b: any) => void;
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  transition?: TransitionType;
}

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
   * Sets the variant for close button.
   */
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(['white']),

  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (uncontrolledProps: AlertProps, ref) => {
    const {
      bsPrefix,
      show = true,
      closeLabel = 'Close alert',
      closeVariant,
      className,
      children,
      variant = 'primary',
      onClose,
      dismissible,
      transition = Fade,
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
        {...(!Transition ? props : undefined)}
        ref={ref}
        className={classNames(
          className,
          prefix,
          variant && `${prefix}-${variant}`,
          dismissible && `${prefix}-dismissible`,
        )}
      >
        {dismissible && (
          <CloseButton
            onClick={handleClose}
            aria-label={closeLabel}
            variant={closeVariant}
          />
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
);

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;

export default Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading,
});
