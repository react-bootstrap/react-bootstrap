/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import tbsUtils, { bsClass, bsSizes } from './utils/bootstrapUtils';
import { Sizes } from './styleMaps';

const ModalDialog = React.createClass({

  propTypes: {
    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: React.PropTypes.string
  },

  render() {
    let modalStyle = {
      display: 'block',
      ...this.props.style
    };
    let prefix = tbsUtils.prefix(this.props);
    let dialogClasses = tbsUtils.getClassSet(this.props);

    delete dialogClasses[prefix];
    dialogClasses[tbsUtils.prefix(this.props, 'dialog')] = true;

    return (
      <div
        {...this.props}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, prefix)}
      >
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className={tbsUtils.prefix(this.props, 'content')} role="document">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
});

export default bsSizes([Sizes.LARGE, Sizes.SMALL],
  bsClass('modal', ModalDialog)
);
