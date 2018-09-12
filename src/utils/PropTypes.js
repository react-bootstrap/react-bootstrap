import PropTypes from 'prop-types';
import createChainableTypeChecker from 'prop-types-extra/lib/utils/createChainableTypeChecker';

import ValidComponentChildren from './ValidComponentChildren';

const idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export function generatedId(name) {
  return (props, ...args) => {
    let error = null;

    if (!props.generateChildId) {
      error = idPropType(props, ...args);

      if (!error && !props.id) {
        error = new Error(
          `In order to properly initialize the ${name} in a way that is accessible to assistive technologies ` +
            `(such as screen readers) an \`id\` or a \`generateChildId\` prop to ${name} is required`,
        );
      }
    }
    return error;
  };
}

export function requiredRoles(...roles) {
  return createChainableTypeChecker((props, propName, component) => {
    let missing;

    roles.every(role => {
      if (
        !ValidComponentChildren.some(
          props.children,
          child => child.props.bsRole === role,
        )
      ) {
        missing = role;
        return false;
      }

      return true;
    });

    if (missing) {
      return new Error(
        `(children) ${component} - Missing a required child with bsRole: ` +
          `${missing}. ${component} must have at least one child of each of ` +
          `the following bsRoles: ${roles.join(', ')}`,
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
        props.children,
        child => child.props.bsRole === role,
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
          `bsRoles: ${roles.join(', ')}`,
      );
    }

    return null;
  });
}
