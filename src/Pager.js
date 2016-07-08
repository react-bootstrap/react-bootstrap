import classNames from 'classnames';
import React, { cloneElement } from 'react';

import PagerItem from './PagerItem';
import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  onSelect: React.PropTypes.func,
};

class Pager extends React.Component {
  render() {
    const { onSelect, className, children, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <ul
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      >
        {ValidComponentChildren.map(children, child => (
          cloneElement(child, {
            onSelect: createChainedFunction(child.props.onSelect, onSelect),
          })
        ))}
      </ul>
    );
  }
}

Pager.propTypes = propTypes;

Pager.Item = PagerItem;

export default bsClass('pager', Pager);
