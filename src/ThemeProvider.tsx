import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';

export interface ThemeProviderProps {
  prefixes: Record<string, unknown>;
}

const ThemeContext = React.createContext({});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({ prefixes, children }) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);

  return <Provider value={copiedPrefixes}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object.isRequired,
};

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const prefixes = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  const Wrapped = React.forwardRef(({ ...props }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix((props as any).bsPrefix, prefix);
    return <Component {...props} bsPrefix={bsPrefix} />;
  });

  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
