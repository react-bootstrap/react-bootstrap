"use strict";

var emptyFunction = require("react/lib/emptyFunction");
var invariant = require("react/lib/invariant");
var joinClasses = require("react/lib/joinClasses");
var merge = require("react/lib/merge");

/**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */
function createTransferStrategy(mergeStrategy) {
  return function(props, key, value) {
    if (!props.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      props[key] = mergeStrategy(props[key], value);
    }
  };
}

/**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 */
var TransferStrategies = {
  /**
   * Never transfer `children`.
   */
  children: emptyFunction,
  /**
   * Transfer the `className` prop by merging them.
   */
  className: createTransferStrategy(joinClasses),
  /**
   * Never transfer the `key` prop.
   */
  key: emptyFunction,
  /**
   * Never transfer the `ref` prop.
   */
  ref: emptyFunction,
  /**
   * Transfer the `style` prop (which is an object) by merging them.
   */
  style: createTransferStrategy(merge)
};


/**
 * Merge two props objects using TransferStrategies.
 *
 * @param {object} oldProps original props (they take precedence)
 * @param {object} newProps new props to merge in
 * @return {object} a new object containing both sets of props merged.
 */
var mergeProps = function(oldProps, newProps) {
  var props = merge(oldProps);

  for (var thisKey in newProps) {
    if (!newProps.hasOwnProperty(thisKey)) {
      continue;
    }

    var transferStrategy = TransferStrategies[thisKey];

    if (transferStrategy) {
      transferStrategy(props, thisKey, newProps[thisKey]);
    } else if (!props.hasOwnProperty(thisKey)) {
      props[thisKey] = newProps[thisKey];
    }
  }

  return props;
};

var ObjectToPropsMixin = {

  /**
   * Transfer an object as props to a target component.
   *
   * Props that do not have an explicit transfer strategy will be transferred
   * only if the target component does not already have the prop set.
   *
   * This is usually used to pass down props to a returned root component.
   *
   * @param {Object} props The props object
   * @param {ReactComponent} component Component receiving the properties.
   * @return {ReactComponent} The supplied `component`.
   * @final
   * @protected
   */
  transferObjectAsPropsTo: function (props, component) {
    ("production" !== process.env.NODE_ENV ? invariant(
      component._owner === this,
      '%s: You can\'t call transferObjectAsPropsTo() on a component that you ' +
      'don\'t own, %s. This usually means you are calling ' +
      'transferPropsTo() on a component passed in as props or children.',
      this.constructor.displayName,
      component.constructor.displayName
    ) : invariant(component._owner === this));

    component.props = mergeProps(
      component.props,
      props
    );

    return component;
  }

};

module.exports = ObjectToPropsMixin;
