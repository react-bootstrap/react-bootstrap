import PropTypes from 'prop-types';
import React from 'react';

const defaultVariantTypes = new Map([
  ['Alert', 'alert'],
  ['Badge', 'badge'],
  ['Button', 'btn'],
  ['ButtonGroup', 'btn-group'],
  ['Breadcrumb', 'breadcrumb'],
  ['BreadcrumbItem', 'breadcrumb-item'],
  ['Carousel', 'carousel'],
  ['CarouselCaption', 'carousel-caption'],
  ['FormCheck', 'form-check'],
  ['FormLabel', 'form-label'],
  ['FormControl', 'form-control']
]);

const StyleContext = React.createContext(defaultVariantTypes);

class StyleProvider extends React.Component {
  static propTypes = {
    variants: PropTypes.Object.isRequired
  };
  constructor(...args) {
    super(...args);
    this.variants = new Map(defaultVariantTypes);
    Object.entries(this.props.variants).forEach(([key, value]) => {
      this.variants.set(key, value);
    });
  }

  render() {
    return (
      <StyleContext.Provider value={this.variants}>
        {this.props.children}
      </StyleContext.Provider>
    );
  }
}

const propTypes = {
  componentType: PropTypes.oneOf([...defaultVariantTypes.keys()]).isRequired,
  props: PropTypes.object.isRequired
};

// eslint-disable-next-line
function StyleConsumer({
  componentType,
  children,
  props: { bsClass, bsRole, bsStyle, bsSize, ...props }
}) {
  return (
    <StyleContext.Consumer>
      {variants =>
        children({
          bsClass: bsClass || variants.get(componentType),
          bsRole,
          bsStyle,
          bsSize,
          props
        })
      }
    </StyleContext.Consumer>
  );
}

StyleConsumer.propTypes = propTypes;

export { StyleConsumer as Consumer, StyleProvider as Provider };
