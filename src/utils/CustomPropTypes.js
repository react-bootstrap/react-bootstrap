import React from 'react';
import warning from 'react/lib/warning';
import childrenToArray from './childrenToArray';

const ANONYMOUS = '<<anonymous>>';

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
          `Required prop '${propName}' was not specified in '${componentName}'.`
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

function errMsg(props, propName, componentName, msgContinuation) {
  return `Invalid prop '${propName}' of value '${props[propName]}'` +
    ` supplied to '${componentName}'${msgContinuation}`;
}

function createMountableChecker() {
  function validate(props, propName, componentName) {
    if (typeof props[propName] !== 'object' ||
      typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
      return new Error(
        errMsg(props, propName, componentName,
          ', expected a DOM element or an object that has a `render` method')
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
        errMsg(props, propName, componentName, `, expected one of ${valuesString}.`)
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

function createElementTypeChecker() {
  function validate(props, propName, componentName) {
    let errBeginning = errMsg(props, propName, componentName,
      '. Expected an Element `type`');

    if (typeof props[propName] !== 'function') {
      if (React.isValidElement(props[propName])) {
        return new Error(errBeginning + ', not an actual Element');
      }

      if (typeof props[propName] !== 'string') {
        return new Error(errBeginning +
          ' such as a tag name or return value of React.createClass(...)');
      }
    }
  }

  return createChainableTypeChecker(validate);
}

export default {

  deprecated(propType, explanation){
    return function(props, propName, componentName){
      if (props[propName] != null) {
        warning(false, `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`);
      }

      return propType(props, propName, componentName);
    };
  },

  isRequiredForA11y(propType){
    return function(props, propName, componentName){
      if (props[propName] == null) {
        return new Error(
          'The prop `' + propName + '` is required to make ' + componentName + ' accessible ' +
            'for users using assistive technologies such as screen readers `'
        );
      }

      return propType(props, propName, componentName);
    };
  },

  requiredRoles(...roles) {
    return createChainableTypeChecker(
      function requiredRolesValidator(props, propName, component) {
        let missing;
        let children = childrenToArray(props.children);

        let inRole = (role, child) => role === child.props.bsRole;

        roles.every(role => {
          if (!children.some(child => inRole(role, child))){
            missing = role;
            return false;
          }
          return true;
        });

        if (missing) {
          return new Error(`(children) ${component} - Missing a required child with bsRole: ${missing}. ` +
            `${component} must have at least one child of each of the following bsRoles: ${roles.join(', ')}`);
        }
      });
  },

  exclusiveRoles(...roles) {
    return createChainableTypeChecker(
      function exclusiveRolesValidator(props, propName, component) {
        let children = childrenToArray(props.children);
        let duplicate;

        roles.every(role => {
          let childrenWithRole = children.filter(child => child.props.bsRole === role);

          if (childrenWithRole.length > 1){
            duplicate = role;
            return false;
          }
          return true;
        });

        if (duplicate) {
          return new Error(
            `(children) ${component} - Duplicate children detected of bsRole: ${duplicate}. ` +
            `Only one child each allowed with the following bsRoles: ${roles.join(', ')}`);
        }
      });
  },

  /**
   * Checks whether a prop provides a DOM element
   *
   * The element can be provided in two forms:
   * - Directly passed
   * - Or passed an object that has a `render` method
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  mountable: createMountableChecker(),

  /**
   * Checks whether a prop provides a type of element.
   *
   * The type of element can be provided in two forms:
   * - tag name (string)
   * - a return value of React.createClass(...)
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  elementType: createElementTypeChecker(),

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
