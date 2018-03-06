import PropTypes from 'prop-types';
import React from 'react';

// const defaultVariantTypes = new Map([
//   ['Alert', 'alert'],
//   ['Badge', 'badge'],
//   ['Button', 'btn'],
//   ['ButtonGroup', 'btn-group'],
//   ['Breadcrumb', 'breadcrumb'],
//   ['BreadcrumbItem', 'breadcrumb-item'],
//   ['Carousel', 'carousel'],
//   ['CarouselCaption', 'carousel-caption'],
//   ['FormCheck', 'form-check'],
//   ['FormLabel', 'form-label'],
//   ['FormControl', 'form-control']
// ]);

const StyleContext = React.createContext(new Map());

class StyleProvider extends React.Component {
  static propTypes = {
    variants: PropTypes.object.isRequired
  };
  constructor(...args) {
    super(...args);
    this.variants = new Map();
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

function createBoostrapComponent({ prefix }, Component) {
  const name = Component.displayName || Component.name;
  // eslint-disable-next-line
  return class extends React.Component {
    static displayName = `Boostrap(${name})`;
    render() {
      return (
        <StyleContext.Consumer>
          {variants => (
            <Component
              {...this.props}
              bsClass={this.props.bsClass || variants.get(prefix) || prefix}
            />
          )}
        </StyleContext.Consumer>
      );
    }
  };
}

export { createBoostrapComponent, StyleProvider as Provider };
