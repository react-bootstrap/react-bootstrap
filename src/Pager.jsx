import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import PagerItem from './PagerItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  onSelect: PropTypes.func
};

class Pager extends React.Component {
  render() {
    const { onSelect, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <ul {...elementProps} className={classNames(className, classes)}>
        {ValidComponentChildren.map(children, child =>
          cloneElement(child, {
            onSelect: createChainedFunction(child.props.onSelect, onSelect)
          })
        )}
      </ul>
    );
  }
}

Pager.propTypes = propTypes;

Pager.Item = PagerItem;

export default bsClass('pager', Pager);
