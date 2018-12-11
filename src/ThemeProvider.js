import PropTypes from 'prop-types';
import forwardRef from 'react-context-toolbox/forwardRef';
import React from 'react';

const { Provider, Consumer } = React.createContext(new Map());

class ThemeProvider extends React.Component {
  static propTypes = {
    prefixes: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.prefixes = new Map();
    Object.keys(this.props.prefixes).forEach(key => {
      this.prefixes.set(key, this.props.prefixes[key]);
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

  return forwardRef(
    ({ ...props }, ref) => {
      props[forwardRefAs] = ref;
      return (
        <Consumer>
          {prefixes => (
            <Component
              {...props}
              bsPrefix={props.bsPrefix || prefixes.get(prefix) || prefix}
            />
          )}
        </Consumer>
      );
    },
    { displayName: `Bootstrap(${Component.displayName || Component.name})` },
  );
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
