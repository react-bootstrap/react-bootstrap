import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';

const Well = React.createClass({

  propTypes: {
    ...bootstrapUtils.propTypes
  },

  getDefaultProps() {
    return {
      bsClass: 'well'
    };
  },

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    return (
      <div {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default Well;
