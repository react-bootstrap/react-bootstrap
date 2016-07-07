import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsClass, bsSizes, getClassSet, prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

/* eslint-disable react/prop-types */
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
    let bsClassPrefix = prefix(this.props);
    let dialogClasses = getClassSet(this.props);

    delete dialogClasses[bsClassPrefix];
    dialogClasses[prefix(this.props, 'dialog')] = true;

    const domProps = ensureDomProps(this.props, 'div');

    return (
      <div
        {...domProps}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, bsClassPrefix)}
      >
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className={prefix(this.props, 'content')} role="document">
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
