import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';

const Label = React.createClass({

  propTypes: {
    ...bootstrapUtils.propTypes
  },

  getDefaultProps() {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    return (
      <span {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Label;
