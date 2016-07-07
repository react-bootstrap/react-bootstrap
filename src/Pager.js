import React, { cloneElement } from 'react';
import classNames from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

import ensureDomProps from './utils/ensureDomProps';

const Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render() {
    const domProps = ensureDomProps(this.props, 'ul');
    return (
      <ul
        {...domProps}
        className={classNames(this.props.className, 'pager')}>
        {ValidComponentChildren.map(this.props.children, this.renderPageItem)}
      </ul>
    );
  },

  renderPageItem(child, index) {
    return cloneElement(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      }
    );
  }
});

export default Pager;
