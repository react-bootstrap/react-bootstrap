import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  bsSizes,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

const propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: PropTypes.string,

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool
};

class ModalDialog extends React.Component {
  render() {
    const {
      dialogClassName,
      centered,
      className,
      style,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const bsClassName = prefix(bsProps);

    const modalStyle = { display: 'block', ...style };

    const dialogClasses = {
      ...getClassSet(bsProps),
      [bsClassName]: false,
      [prefix(bsProps, 'dialog')]: true,
      [prefix(bsProps, 'dialog-centered')]: centered
    };

    return (
      <div
        {...elementProps}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(className, bsClassName)}
      >
        <div className={classNames(dialogClassName, dialogClasses)}>
          <div className={prefix(bsProps, 'content')} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = propTypes;

export default bsClass('modal', bsSizes([Size.LARGE, Size.SMALL], ModalDialog));
