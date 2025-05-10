import classNames from 'classnames';
import * as React from 'react';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useBootstrapPrefix } from './ThemeProvider';
import AlertHeading from './AlertHeading';
import AlertLink from './AlertLink';
import Fade from './Fade';
import CloseButton, { type CloseButtonVariant } from './CloseButton';
import type { Variant } from './types';
import type { TransitionType } from './helpers';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'alert'
   */
  bsPrefix?: string | undefined;

  /**
   * The Alert visual variant.
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  variant?: Variant | undefined;

  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the Alert.
   */
  dismissible?: boolean | undefined;

  /**
   * Controls the visual state of the Alert.
   *
   * @controllable onClose
   */
  show?: boolean | undefined;

  /**
   * Default show state of the Alert.
   */
  defaultShow?: boolean | undefined;

  /**
   * Callback fired when alert is closed.
   *
   * @type {((show: boolean, event: any) => void) | undefined}
   * @controllable show
   */
  onClose?: ((show: boolean, event: any) => void) | undefined;

  /**
   * Sets the text for alert close button.
   */
  closeLabel?: string | undefined;

  /**
   * Sets the variant for close button.
   */
  closeVariant?: CloseButtonVariant | undefined;

  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition?: TransitionType | undefined;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (uncontrolledProps, ref) => {
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

export default Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading,
});
