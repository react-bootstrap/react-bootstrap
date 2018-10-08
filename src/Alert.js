import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import uncontrollable from 'uncontrollable';
import divWithClassName from './utils/divWithClassName';

import createWithBsPrefix from './utils/createWithBsPrefix';
import { createBootstrapComponent } from './ThemeProvider';
import Fade from './Fade';
import CloseButton from './CloseButton';
import SafeAnchor from './SafeAnchor';

/**
 * @property {AlertHeading} Heading
 * @property {AlertLink} Link
 */
class Alert extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    show: true,
    transition: Fade,
    closeLabel: 'Close alert',
  };

  handleClose = e => {
    this.props.onClose(false, e);
  };

  render() {
    const {
      bsPrefix,
      show,
      closeLabel,
      className,
      children,
      variant,
      dismissible,
      transition: Transition,
      onClose: _,
      ...props
    } = this.props;

    const alert = (
      <div
        role="alert"
        {...(Transition ? props : undefined)}
        className={classNames(
          className,
          bsPrefix,
          variant && `${bsPrefix}-${variant}`,
          dismissible && `${bsPrefix}-dismissible`,
        )}
      >
        {dismissible && (
          <CloseButton onClick={this.handleClose} label={closeLabel} />
        )}
        {children}
      </div>
    );

    if (!Transition) return show ? alert : null;

    return (
      <Transition unmountOnExit {...props} in={show}>
        {alert}
      </Transition>
    );
  }
}

const DecoratedAlert = uncontrollable(
  createBootstrapComponent(Alert, 'alert'),
  {
    show: 'onClose',
  },
);

const DivStyledAsH4 = divWithClassName('h4');

DecoratedAlert.Link = createWithBsPrefix('alert-link', {
  Component: SafeAnchor,
});

DecoratedAlert.Heading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4,
});

export default DecoratedAlert;
