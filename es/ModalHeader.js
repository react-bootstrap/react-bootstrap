import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

// TODO: `aria-label` should be `closeLabel`.

var propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  'aria-label': React.PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: React.PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: React.PropTypes.func
};

var defaultProps = {
  'aria-label': 'Close',
  closeButton: false
};

var contextTypes = {
  $bs_modal: React.PropTypes.shape({
    onHide: React.PropTypes.func
  })
};

var ModalHeader = function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ModalHeader.prototype.render = function render() {
    var _props = this.props,
        label = _props['aria-label'],
        closeButton = _props.closeButton,
        onHide = _props.onHide,
        className = _props.className,
        children = _props.children,
        props = _objectWithoutProperties(_props, ['aria-label', 'closeButton', 'onHide', 'className', 'children']);

    var modal = this.context.$bs_modal;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return React.createElement(
      'div',
      _extends({}, elementProps, {
        className: classNames(className, classes)
      }),
      closeButton && React.createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          'aria-label': label,
          onClick: createChainedFunction(modal.onHide, onHide)
        },
        React.createElement(
          'span',
          { 'aria-hidden': 'true' },
          '\xD7'
        )
      ),
      children
    );
  };

  return ModalHeader;
}(React.Component);

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;
ModalHeader.contextTypes = contextTypes;

export default bsClass('modal-header', ModalHeader);