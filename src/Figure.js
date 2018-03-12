import React from 'react';
import classNames from 'classnames';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'figure'
};

class Figure extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Figure.propTypes = propTypes;
Figure.defaultProps = defaultProps;

Figure.Image = FigureImage;
Figure.Caption = FigureCaption;

export default bsClass('figure', Figure);
