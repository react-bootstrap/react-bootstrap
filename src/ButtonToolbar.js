import classNames from 'classnames';
import React from 'react';

import { getClassSet } from './utils/bootstrapUtils';

import Button from './Button';

import ensureDomProps from './utils/ensureDomProps';

const ButtonToolbar = React.createClass({

  propTypes: {
    bsSize: Button.propTypes.bsSize
  },

  getDefaultProps() {
    return {
      bsClass: 'btn-toolbar'
    };
  },

  render() {
    let classes = getClassSet(this.props);
    const domProps = ensureDomProps(this.props, 'div');
    return (
      <div
        {...domProps}
        role="toolbar"
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </div>
    );
  }
});

export default ButtonToolbar;
