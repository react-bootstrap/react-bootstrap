import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

class Figure extends React.Component {
  static propTypes = {
    /**
     * @default 'figure'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'figure'
  };

  render() {
    const {
      componentClass: Component,
      bsPrefix,
      className,
      ...props
    } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

const DecoratedFigure = createBootstrapComponent(Figure, 'figure');

DecoratedFigure.Image = FigureImage;
DecoratedFigure.Caption = FigureCaption;
export default DecoratedFigure;
