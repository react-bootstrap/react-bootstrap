import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useMemo } from 'react';

export interface ThemeContextValue {
  prefixes: Record<string, string>;
  dir?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThemeProviderProps extends Partial<ThemeContextValue> {}

const ThemeContext = React.createContext<ThemeContextValue>({ prefixes: {} });
const { Consumer, Provider } = ThemeContext;

const ThemeProvider: React.FC<Partial<ThemeContextValue>> = ({
  prefixes = {},
  dir,
  children,
}) => {
  const contextValue = useMemo(
    () => ({
      prefixes: { ...prefixes },
      dir,
    }),
    [prefixes, dir],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  dir: PropTypes.string,
} as any;

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export function useRTL() {
  const { dir } = useContext(ThemeContext);
  return dir === 'rtl';
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
