import React, { cloneElement } from 'react';
import classNames from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';
import PagerItem from './PagerItem';

const Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render() {
    return (
      <ul
        {...this.props}
        className={classNames(this.props.className, 'pager')}>
        {ValidComponentChildren.map(this.props.children, this.renderPagerItem)}
      </ul>
    );
  },

  renderPagerItem(child, index) {
    return cloneElement(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      }
    );
  }
});

Pager.Item = PagerItem;

export default Pager;
