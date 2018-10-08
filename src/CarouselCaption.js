import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { elementType } from 'prop-types-extra';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'carousel-caption'
   */
  bsPrefix: PropTypes.string,
  as: elementType,
};

const defaultProps = {
  as: 'div',
};

class CarouselCaption extends React.Component {
  render() {
    const { as: Component, className, bsPrefix, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

CarouselCaption.propTypes = propTypes;
CarouselCaption.defaultProps = defaultProps;

export default createBootstrapComponent(CarouselCaption, 'carousel-caption');
