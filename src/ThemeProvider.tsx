import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useMemo } from 'react';

export const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export interface ThemeContextValue {
  prefixes: Record<string, string>;
  breakpoints: string[];
  dir?: string;
}

export interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  dir,
  children,
}: ThemeProviderProps) {
  const contextValue = useMemo(
    () => ({
      prefixes: { ...prefixes },
      breakpoints,
      dir,
    }),
    [prefixes, breakpoints, dir],
  );

  return <Provider value={contextValue}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  breakpoints: PropTypes.arrayOf(PropTypes.string),
  dir: PropTypes.string,
} as any;

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export function useBootstrapBreakpoints() {
  const { breakpoints } = useContext(ThemeContext);
  return breakpoints;
}

export function useIsRTL() {
  const { dir } = useContext(ThemeContext);
  return dir === 'rtl';
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  const Wrapped = React.forwardRef<any, { bsPrefix?: string }>(
    ({ ...props }, ref) => {
      props[forwardRefAs] = ref;
      const bsPrefix = useBootstrapPrefix((props as any).bsPrefix, prefix);
      return <Component {...props} bsPrefix={bsPrefix} />;
    },
  );

  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
