import PropTypes from 'prop-types';
import forwardRef from '@restart/context/forwardRef';
import React, { useContext, useMemo } from 'react';

const ThemeContext = React.createContext({});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({ prefixes, children }) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);

  return <Provider value={copiedPrefixes}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object.isRequired,
};

export function useBootstrapPrefix(prefix, defaultPrefix) {
  const prefixes = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  return forwardRef(
    ({ ...props }, ref) => {
      props[forwardRefAs] = ref;
      // eslint-disable-next-line react/prop-types
      const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
      return <Component {...props} bsPrefix={bsPrefix} />;
    },
    { displayName: `Bootstrap(${Component.displayName || Component.name})` },
  );
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
