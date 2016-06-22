import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

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

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'carousel-caption')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default CarouselCaption;
