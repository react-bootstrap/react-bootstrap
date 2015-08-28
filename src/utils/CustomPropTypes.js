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

export default {

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
  }
};
