import React from 'react';
import invariant from 'invariant';

let variants = new Map([
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

const StyleContext = React.createContext(variants);

class StyleProvider extends React.Component {
  constructor(...args) {
    super(...args);
    this.variants = new Map(variants);
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

export { StyleConsumer as Consumer, StyleProvider as Provider };
