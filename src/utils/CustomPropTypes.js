const ANONYMOUS = '<<anonymous>>';

const CustomPropTypes = {
  /**
   * Checks whether a prop provides a DOM element
   *
   * The element can be provided in two forms:
   * - Directly passed
   * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  mountable: createMountableChecker(),

  /**
   * Checks whether a prop matches a key of an associated object
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  keyOf: createKeyOfChecker,
  /**
   * Checks if only one of the listed properties is in use. An error is given
   * if multiple have a value
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  singlePropFrom: createSinglePropFromChecker,

  all
};

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` was not specified in ' +
            '`' + componentName + '`.'
        );
      }
    } else {
      return validate(props, propName, componentName);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createMountableChecker() {
  function validate(props, propName, componentName) {
    if (typeof props[propName] !== 'object' ||
      typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to ' +
          '`' + componentName + '`, expected a DOM element or an object that has a `render` method'
      );
    }
  }

  return createChainableTypeChecker(validate);
}

function createKeyOfChecker(obj) {
  function validate(props, propName, componentName) {
    let propValue = props[propName];
    if (!obj.hasOwnProperty(propValue)) {
      let valuesString = JSON.stringify(Object.keys(obj));
      return new Error(
        `Invalid prop '${propName}' of value '${propValue}' ` +
        `supplied to '${componentName}', expected one of ${valuesString}.`
      );
    }
  }
  return createChainableTypeChecker(validate);
}

function createSinglePropFromChecker(arrOfProps) {
  function validate(props, propName, componentName) {
    const usedPropCount = arrOfProps
      .map(listedProp => props[listedProp])
      .reduce((acc, curr) => acc + (curr !== undefined ? 1 : 0), 0);

    if (usedPropCount > 1) {
      const [first, ...others] = arrOfProps;
      const message = `${others.join(', ')} and ${first}`;
      return new Error(
        `Invalid prop '${propName}', only one of the following ` +
        `may be provided: ${message}`
      );
    }
  }
  return validate;
}

function all(propTypes) {
  if (propTypes === undefined) {
    throw new Error('No validations provided');
  }

  if (!(propTypes instanceof Array)) {
    throw new Error('Invalid argument must be an array');
  }

  if (propTypes.length === 0) {
    throw new Error('No validations provided');
  }

  return function(props, propName, componentName) {
    for(let i = 0; i < propTypes.length; i++) {
      let result = propTypes[i](props, propName, componentName);

      if (result !== undefined && result !== null) {
        return result;
      }
    }
  };
}

export default CustomPropTypes;
