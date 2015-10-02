import React from 'react';
import { singlePropFrom } from './CustomPropTypes';

const propList = ['children', 'value'];

export default function valueValidation(props, propName, componentName) {
  let error = singlePropFrom(propList)(props, propName, componentName);

  if (!error) {
    error = React.PropTypes.node(props, propName, componentName);
  }

  return error;
}
