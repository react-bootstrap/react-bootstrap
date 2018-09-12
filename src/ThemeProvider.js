import PropTypes from 'prop-types';
import React from 'react';

const { Provider, Consumer } = React.createContext(new Map());

class ThemeProvider extends React.Component {
  static propTypes = {
    prefixes: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.prefixes = new Map();
    Object.entries(this.props.prefixes).forEach(([key, value]) => {
      this.prefixes.set(key, value);
    });
  }

  render() {
    return <Provider value={this.prefixes}>{this.props.children}</Provider>;
  }
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref

  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  const name = Component.displayName || Component.name;
  // This looks like a function component but it's not,
  // it's passed to forwardRef directly, and named for the dev-tools
  // eslint-disable-next-line react/prop-types
  function forwardRef({ bsPrefix, ...props }, ref) {
    props[forwardRefAs] = ref;
    return (
      <Consumer>
        {prefixes => (
          <Component
            {...props}
            bsPrefix={bsPrefix || prefixes.get(prefix) || prefix}
          />
        )}
      </Consumer>
    );
  }
  forwardRef.displayName = `Bootstrap(${name})`;

  return React.forwardRef(forwardRef);
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
