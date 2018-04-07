import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  as: elementType
};

const defaultProps = {
  as: 'div'
};

class CarouselCaption extends React.Component {
  render() {
    const { as: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

CarouselCaption.propTypes = propTypes;
CarouselCaption.defaultProps = defaultProps;

export default bsClass('carousel-caption', CarouselCaption);
