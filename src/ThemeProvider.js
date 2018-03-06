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
  const name = Component.displayName || Component.name;
  // eslint-disable-next-line
  return class extends React.Component {
    static displayName = `Boostrap(${name})`;
    static propTypes = {
      bsPrefix: PropTypes.string
    };
    render() {
      return (
        <ThemeContext.Consumer>
          {variants => (
            <Component
              {...this.props}
              bsPrefix={this.props.bsPrefix || variants.get(prefix) || prefix}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  };
}

export { createBootstrapComponent };
export default ThemeProvider;
