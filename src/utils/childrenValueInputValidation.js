import React from 'react';
import { all, singlePropFrom } from './CustomPropTypes';

const propList = ['children', 'value'];

export default all([
  singlePropFrom(propList),
  React.PropTypes.node
]);
