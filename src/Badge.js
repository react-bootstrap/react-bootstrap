import React from 'react';
import ValidComponentChildren from './utils/ValidComponentChildren';
import classNames from 'classnames';


const Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  hasContent() {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
      (React.Children.count(this.props.children) > 1) ||
      (typeof this.props.children === 'string') ||
      (typeof this.props.children === 'number');
  },

  render() {
    let classes = {
      'pull-right': this.props.pullRight,
      'badge': this.hasContent()
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
