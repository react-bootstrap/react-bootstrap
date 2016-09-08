import createChainableTypeChecker
  from 'react-prop-types/lib/utils/createChainableTypeChecker';

import ValidComponentChildren from './ValidComponentChildren';

export function requiredRoles(...roles) {
  return createChainableTypeChecker((props, propName, component) => {
    let missing;

    roles.every(role => {
      if (!ValidComponentChildren.some(
        props.children, child => child.props.bsRole === role
      )) {
        missing = role;
        return false;
      }

      return true;
    });

    if (missing) {
      return new Error(
        `(children) ${component} - Missing a required child with bsRole: ` +
        `${missing}. ${component} must have at least one child of each of ` +
        `the following bsRoles: ${roles.join(', ')}`
      );
    }

    return null;
  });
}

export function exclusiveRoles(...roles) {
  return createChainableTypeChecker((props, propName, component) => {
    let duplicate;

    roles.every(role => {
      const childrenWithRole = ValidComponentChildren.filter(
        props.children, child => child.props.bsRole === role
      );

      if (childrenWithRole.length > 1) {
        duplicate = role;
        return false;
      }

      return true;
    });

    if (duplicate) {
      return new Error(
        `(children) ${component} - Duplicate children detected of bsRole: ` +
        `${duplicate}. Only one child each allowed with the following ` +
        `bsRoles: ${roles.join(', ')}`
      );
    }

    return null;
  });
}
