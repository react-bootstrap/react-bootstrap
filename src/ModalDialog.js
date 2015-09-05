/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const ModalDialog = React.createClass({
  mixins: [BootstrapMixin],

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
    let bsClass = this.props.bsClass;
    let dialogClasses = this.getBsClassSet();

    delete dialogClasses.modal;
    dialogClasses[`${bsClass}-dialog`] = true;

    return (
      <div
        {...this.props}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, bsClass)}>
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className={`${bsClass}-content`} role="document">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
});

export default ModalDialog;
