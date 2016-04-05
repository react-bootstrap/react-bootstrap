import React from 'react';
import ValidComponentChildren from './utils/ValidComponentChildren';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

const Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      pullRight: false,
      bsClass: 'badge'
    };
  },

  hasContent() {
    const { children } = this.props;

    return (
      ValidComponentChildren.count(children) > 0 ||
      React.Children.count(children) > 1 ||
      typeof children === 'string' ||
      typeof children === 'number'
    );
  },

  render() {
    let classes = {
      'pull-right': this.props.pullRight,
      [tbsUtils.prefix(this.props)]: this.hasContent()
    };
    return (
      <span
        {...this.props}
        className={classNames(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Badge;
