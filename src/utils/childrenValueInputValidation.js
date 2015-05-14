import React from 'react';
import { singlePropFrom } from './CustomPropTypes';

const propList = ['children', 'value'];
const typeList = [React.PropTypes.number, React.PropTypes.string];

export default function valueValidation(props, propName, componentName) {
  let error = singlePropFrom(propList)(props, propName, componentName);
  if (!error) {
    const oneOfType = React.PropTypes.oneOfType(typeList);
    error = oneOfType(props, propName, componentName);
  }
  return error;
}
