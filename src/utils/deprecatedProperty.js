import React from 'react';
import deprecationWarning from './deprecationWarning';

export default function collapsable(props, propName, componentName) {
  if (props[propName] !== undefined) {
    deprecationWarning(
      `${propName} in ${componentName}`,
      'collapsible',
      'https://github.com/react-bootstrap/react-bootstrap/issues/425'
    );
  }
  return React.PropTypes.bool.call(null, props, propName, componentName);
}
