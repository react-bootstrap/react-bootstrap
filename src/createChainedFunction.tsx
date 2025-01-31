/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction(...funcs) {
  return funcs
    .filter((f) => f != null)
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error(
          'Invalid Argument Type, must only provide functions, undefined, or null.',
        );
      }

      if (acc === null) return f;

      return function chainedFunction(...args) {
        // @ts-expect-error ignore "this" error
        acc.apply(this, args);
        // @ts-expect-error ignore "this" error
        f.apply(this, args);
      };
    }, null);
}

export default createChainedFunction;
