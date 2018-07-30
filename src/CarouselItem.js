import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'carousel-item'
   */
  bsPrefix: PropTypes.string,
};

class CarouselItem extends React.Component {
  render() {
    const { bsPrefix, children, className, ...props } = this.props;

    return (
      <div {...props} className={classNames(className, bsPrefix)}>
        {children}
      </div>
    );
  }
}

CarouselItem.propTypes = propTypes;

export default createBootstrapComponent(CarouselItem, 'carousel-item');
