import classNames from 'classnames';
import React from 'react';

import { bsClass, bsSizes, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

const propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: React.PropTypes.string,
};

class ModalDialog extends React.Component {
  render() {
    const {
      dialogClassName, className, style, children, ...props,
    } = this.props;

    const modalStyle = {
      display: 'block',
      ...style,
    };

    const bsClassName = prefix(props);

    const dialogClasses = {
      ...getClassSet(props),
      [bsClassName]: false,
      [prefix(props, 'dialog')]: true,
    };

    return (
      <div
        {...omitBsProps(props)}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(className, bsClassName)}
      >
        <div className={classNames(dialogClassName, dialogClasses)}>
          <div className={prefix(props, 'content')} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = propTypes;

export default bsClass('modal',
  bsSizes([Size.LARGE, Size.SMALL], ModalDialog)
);
