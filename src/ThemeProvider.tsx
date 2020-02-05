import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import classNames from './createClassNames';

export interface ThemeProviderProps {
  prefixes: Record<string, unknown>;
  classNameMap: Record<string, string>,
  // createClassNameMapper: classMap => classNames(classMap, item => item),
}

const ThemeContext = React.createContext({});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({
  prefixes,
  classNameMap,
  classNameConverter,
  children,
}) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);
  const globalClassNameMap = useMemo(() => ({ ...classNameMap }), [
    classNameMap,
  ]);

  const createClassNameMapper = localClassNameMap =>
    classNames(
      {
        ...globalClassNameMap,
        ...localClassNameMap,
      },
      classNameConverter,
    );

  return (
    <Provider
      value={{
        prefixes: copiedPrefixes,
        classNameMap: globalClassNameMap,
        createClassNameMapper,
      }}
    >
      {children}
    </Provider>
  );
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  /**
   * A map of class names. The key's of the map should be
   * the Bootstrap class names used by the react-bootstrap components.
   * The value of the map record should be class name that will
   * be provided to the className attribute.
   */
  classNameMap: PropTypes.object,
  /**
   * Allows for a callback converter to be called on each
   * class name before it is looked up in the `classNameMap`. This
   * is to allow support for environments where the css-loader is
   * set to convert the class names to `camelCaseOnly`.
   */
  classNameConverter: PropTypes.func,
};

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export function useClassNameMapper(localClassNameMap) {
  const { createClassNameMapper } = useContext(ThemeContext);
  return createClassNameMapper(localClassNameMap);
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
