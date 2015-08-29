import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';

const ButtonToolbar = React.createClass({

  propTypes: {
    ...bootstrapUtils.propTypes
  },

  getDefaultProps() {
    return {
      bsClass: 'button-toolbar'
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
