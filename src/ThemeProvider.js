import PropTypes from 'prop-types';
import classNames from 'classnames';

import forwardRef from '@restart/context/forwardRef';
import React, { useContext } from 'react';

const ThemeContext = React.createContext(new Map());
const { Consumer, Provider } = ThemeContext;

class ThemeProvider extends React.Component {
  static propTypes = {
    prefixes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.prefixes = new Map();
    Object.keys(this.props.prefixes).forEach(key => {
      this.prefixes.set(key, this.props.prefixes[key]);
    });
  }

  render() {
    return <Provider value={this.prefixes}>{this.props.children}</Provider>;
  }
}

export function useBootstrapPrefix(prefix, defaultPrefix) {
  const prefixes = useContext(ThemeContext);
  return prefix || prefixes.get(defaultPrefix) || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  const BootstrapComponent = ({ className, float, ...props }, ref) => {
    props[forwardRefAs] = ref;
    const prefixes = useContext(ThemeContext);
    let floats = null;
    if (float && Object.keys(float).length > 0) {
      floats = Object.entries(float).reduce(
        (acc, [property, value]) =>
          acc +
          (property !== 'default'
            ? `float-${property}-${value} `
            : `float-${value} `),
        '',
      );
    }
    return (
      <Component
        {...props}
        className={classNames(className, floats)}
        // eslint-disable-next-line react/prop-types
        bsPrefix={props.bsPrefix || prefixes.get(prefix) || prefix}
      />
    );
  };

  BootstrapComponent.propTypes = {
    float: PropTypes.exact({
      default: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
    }),
  };

  return forwardRef(BootstrapComponent, {
    displayName: `Bootstrap(${Component.displayName || Component.name})`,
  });
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
