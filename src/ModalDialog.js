/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import bootstrapUtils, { bsSizes } from './utils/bootstrapUtils';
import { Sizes } from './styleMaps';

const ModalDialog = React.createClass({

  propTypes: {
    /**
     * A Callback fired when the header closeButton or non-static backdrop is clicked.
     * @type {function}
     * @required
     */
    onHide: React.PropTypes.func.isRequired,

    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: React.PropTypes.string

  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      closeButton: true
    };
  },

  render() {
    let modalStyle = {
      display: 'block',
      ...this.props.style
    };
    let prefix = bootstrapUtils.prefix(this.props);
    let dialogClasses = bootstrapUtils.getClassSet(this.props);

    delete dialogClasses.modal;
    dialogClasses[`${prefix}-dialog`] = true;

    return (
      <div
        {...this.props}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, prefix)}>
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className={`${prefix}-content`} role="document">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
});

export default bsSizes([Sizes.LARGE, Sizes.SMALL],
  ModalDialog
);
