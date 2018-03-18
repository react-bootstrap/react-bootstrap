import PropTypes from 'prop-types';
import React from 'react';

const ThemeContext = React.createContext(new Map());

class ThemeProvider extends React.Component {
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
      <ThemeContext.Provider value={this.variants}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

function createBootstrapComponent(Component, prefix) {
  const refProp = '@@react-bootstrap/ref';
  const name = Component.displayName || Component.name;
  // eslint-disable-next-line
  class BootstrapComponent extends React.Component {
    static displayName = `Bootstrap(${name})`;
    static propTypes = {
      bsPrefix: PropTypes.string,
      [refProp]: PropTypes.any
    };
    render() {
      const { [refProp]: ref, bsPrefix, ...props } = this.props;
      return (
        <ThemeContext.Consumer>
          {variants => (
            <Component
              {...props}
              ref={ref}
              bsPrefix={bsPrefix || variants.get(prefix) || prefix}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }
  return React.forwardRef((props, ref) =>
    React.createElement(BootstrapComponent, { ...props, [refProp]: ref })
  );
}

export { createBootstrapComponent };
export default ThemeProvider;
