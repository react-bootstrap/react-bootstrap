/**
 * Custom converter for the class name
 *
 * @callback classNameConverter
 * @param {string} className - The class name.
 */

/**
 * Provides a wrapper around an API similar to [classnames#bind](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)
 * that also supports converting class names before they are looked up in
 * the `classNameMap`.
 *
 * @param {Record<string, string>} classNameMap - A map of class names
 * @param {classNameConverter} classNameConverter - A callback function to convert the class name before being looked up in the class name map
 *
 * @returns {function(...[*]): string} - Returns an API equivalent to [classnames](https://github.com/JedWatson/classnames#usage).
 */
function createClassNames(
  classNameMap = {},
  classNameConverter = className => className,
) {
  return function internalClassNames(...classNamesOrObjects) {
    function convert(className) {
      return classNameMap[classNameConverter(className)] || className;
    }

    return classNamesOrObjects
      .filter(item => item)
      .map(item => {
        const itemType = typeof item;

        if (itemType === 'string' || itemType === 'number') {
          return convert(`${item}`);
        }
        if (Array.isArray(item)) {
          return internalClassNames(...item);
        }
        if (itemType === 'object') {
          return internalClassNames(Object.keys(item).filter(key => item[key]));
        }
        return null;
      })
      .filter(item => item !== null)
      .join(' ')
      .trim();
  };
}

export default createClassNames;
