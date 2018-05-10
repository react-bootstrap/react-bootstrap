import PropTypes from 'prop-types';
import React from 'react';
import ValidComponentChildren from './utils/ValidComponentChildren';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

class Badge extends React.Component {
  static propTypes = {
    pullRight: PropTypes.bool
  };

  static defaultProps = {
    pullRight: false,
    bsClass: 'badge'
  };

  hasContent = () => {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
      (React.Children.count(this.props.children) > 1) ||
      (typeof this.props.children === 'string') ||
      (typeof this.props.children === 'number');
  };

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
}

export default Badge;
