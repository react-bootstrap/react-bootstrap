import React from 'react';
import PropTypes from 'prop-types';

import Fade from './Fade';
import Header from './ToastHeader';
import Body from './ToastBody';
import { createBootstrapComponent } from './ThemeProvider';
import ToastDialog from './ToastDialog';

const propTypes = {
  /**
   * @default 'toast'
   */
  bsPrefix: PropTypes.string,

  /**
   * Apply a CSS fade transition to the toast
   */
  animation: PropTypes.bool,

  /**
   * A css class to apply to the Toast dialog DOM node.
   */
  dialogClassName: PropTypes.string,

  /**
   * A Component type that provides the toast content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * toast component.
   */
  dialogAs: PropTypes.elementType,

  /**
   * Auto hide the toast
   */
  autohide: PropTypes.bool,

  /**
   * Delay hiding the toast (ms)
   */
  delay: PropTypes.number,

  /**
   * A Callback fired when the close button is clicked.
   */
  onClose: PropTypes.func,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /** A `react-transition-group` Transition component used to animate the Toast on dismissal. */
  transition: PropTypes.elementType,
};

const defaultProps = {
  animation: true,
  autohide: false,
  delay: 500,
  dialogAs: ToastDialog,
  show: true,
  transition: Fade,
};

const Toast = ({ children, dialogAs: Dialog, ...props }) => (
  <Dialog {...props}>{children}</Dialog>
);

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

const DecoratedToast = createBootstrapComponent(Toast, 'toast');

DecoratedToast.Body = Body;
DecoratedToast.Header = Header;

export default DecoratedToast;
