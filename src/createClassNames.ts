import classNames from 'classnames';

export type ClassNamesFnWrapper = (...classes) => string | undefined;

/**
 * Provides a wrapper around a [classnames#bind](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 * that also supports converting class names before they are looked up in
 * the `classNameMap`.
 *
 * @param {Record<string, string>} localClassNameMap - A map of class names
 * @param {Record<string, string>} globalClassNameMap - A map of class names
 * @param {classNameConverter} classNameConverter - A callback function to convert the class name before being looked up in the class name map
 *
 * @returns {function(...[*]): string} - Returns an API equivalent to [classnames](https://github.com/JedWatson/classnames#usage), but
 * one that can also return `undefined` in the case there are no valid classes.
 */
function createClassNames(
  localClassNameMap: Record<string, string> = {},
  globalClassNameMap: Record<string, string> = {},
  classNameConverter: (className: string) => string = (className: string) =>
    className,
): ClassNamesFnWrapper {
  function convert(className: string): string {
    const convertedClassName = classNameConverter(className);

    return (
      localClassNameMap[convertedClassName] ??
      globalClassNameMap[convertedClassName] ??
      className
    );
  }

  return function classNamesWrapper(...classes): string | undefined {
    const finalClassNames = classNames(...classes)
      .split(' ')
      .map(convert)
      .join(' ');

    return finalClassNames.length > 0 ? finalClassNames : undefined;
  };
}

export default createClassNames;
