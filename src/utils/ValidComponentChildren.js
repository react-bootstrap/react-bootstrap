import React from 'react';

/**
 * Maps children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapValidComponents(children, func, context) {
  let index = 0;

  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      let lastIndex = index;
      index++;
      return func.call(context, child, lastIndex);
    }

    return child;
  });
}

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachValidComponents(children, func, context) {
  let index = 0;

  return React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      func.call(context, child, index);
      index++;
    }
  });
}

/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */
function numberOfValidComponents(children) {
  let count = 0;

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) { count++; }
  });

  return count;
}

/**
 * Determine if the Child container has one or more "valid components".
 *
 * @param {?*} children Children tree container.
 * @returns {boolean}
 */
function hasValidComponent(children) {
  let hasValid = false;

  React.Children.forEach(children, child => {
    if (!hasValid && React.isValidElement(child)) {
      hasValid = true;
    }
  });

  return hasValid;
}

function find(children, finder) {
  let child;

  forEachValidComponents(children, (c, idx) => {
    if (!child && finder(c, idx, children)) {
      child = c;
    }
  });

  return child;
}

/**
 * Finds children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} findFunc.
 * @param {*} findContext Context for findContext.
 * @returns {array} of children that meet the findFunc return statement
 */
function findValidComponents(children, func, context) {
  let index = 0;
  let returnChildren = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (func.call(context, child, index)) {
        returnChildren.push(child);
      }
      index++;
    }
  });

  return returnChildren;
}

export default {
  map: mapValidComponents,
  forEach: forEachValidComponents,
  numberOf: numberOfValidComponents,
  find,
  findValidComponents,
  hasValidComponent
};
