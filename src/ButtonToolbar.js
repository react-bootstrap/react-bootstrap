import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';
import Button from './Button';

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
    let classes = bootstrapUtils.getClassSet(this.props);

    return (
      <div
        {...this.props}
        role="toolbar"
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonToolbar;
