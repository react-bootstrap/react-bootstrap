import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';

import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
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
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onClose: PropTypes.func,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,
};

const defaultProps = {
  animation: true,
  autohide: true,
  delay: 500,
  dialogAs: ToastDialog,
  show: true,
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return <Fade {...props} />;
}

function BackdropTransition(props) {
  return <Fade {...props} />;
}

/* eslint-enable no-use-before-define */

const Toast = ({
  style,
  dialogClassName,
  children,
  dialogAs: Dialog,

  /* BaseToast props */
  animation,
  ...props
}) => <Dialog {...props}>{children}</Dialog>;

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

const DecoratedToast = createBootstrapComponent(Toast, 'toast');

DecoratedToast.Body = Body;
DecoratedToast.Header = Header;

export default DecoratedToast;
