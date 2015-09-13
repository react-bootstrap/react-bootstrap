import React from 'react';
import singlePropFrom from 'react-prop-types/lib/singlePropFrom';

export default function valueValidation(props, propName, componentName) {
  let error = singlePropFrom('children', 'value')(props, propName, componentName);

  if (!error) {
    error = React.PropTypes.node(props, propName, componentName);
  }

  return error;
}
