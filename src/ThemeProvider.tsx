import * as React from 'react';
import { useContext, useMemo } from 'react';

export const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export const DEFAULT_MIN_BREAKPOINT = 'xs';

export interface ThemeContextValue {
  /**
   * An object mapping of Bootstrap component classes that
   * map to a custom class.
   *
   * **Note: Changing prefixes is an escape hatch and generally
   * shouldn't be used.**
   *
   * For more information, see [here](/getting-started/theming/#prefixing-components).
   */
  prefixes: Record<string, string>;

  /**
   * An array of breakpoints that your application supports.
   * Defaults to the standard Bootstrap breakpoints.
   */
  breakpoints: string[];

  /**
   * The minimum breakpoint used by your application.
   * Defaults to the smallest of the standard Bootstrap breakpoints.
   */
  minBreakpoint?: string | undefined;

  /**
   * Indicates the directionality of the application's text.
   *
   * Use `rtl` to set text as "right to left".
   */
  dir?: string | undefined;
}

export interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT,
});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children,
}: ThemeProviderProps) {
  const contextValue = useMemo(
    () => ({
      prefixes: { ...prefixes },
      breakpoints,
      minBreakpoint,
      dir,
    }),
    [prefixes, breakpoints, minBreakpoint, dir],
  );

  return <Provider value={contextValue}>{children}</Provider>;
}

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

export function useBootstrapMinBreakpoint() {
  const { minBreakpoint } = useContext(ThemeContext);
  return minBreakpoint;
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
