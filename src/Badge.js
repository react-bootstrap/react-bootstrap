import classNames from 'classnames';
import React from 'react';

import { prefix } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

import ensureDomProps from './utils/ensureDomProps';

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
      [prefix(this.props)]: this.hasContent()
    };
    const domProps = ensureDomProps(this.props, 'span');
    return (
      <span
        {...domProps}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </span>
    );
  }
});

export default Badge;
