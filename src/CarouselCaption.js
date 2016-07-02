import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import ensureDomProps from './utils/ensureDomProps';

const CarouselCaption = React.createClass({
  displayName: 'Carousel.Caption',
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    const domProps = ensureDomProps(this.props, ComponentClass);
    return (
      <ComponentClass {...domProps} className={classNames(this.props.className, 'carousel-caption')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default CarouselCaption;
