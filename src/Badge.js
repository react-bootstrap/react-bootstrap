import React from 'react';
import ValidComponentChildren from './utils/ValidComponentChildren';
import classSet from 'classnames';


const Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  hasContent() {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
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
        className={classSet(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Badge;
