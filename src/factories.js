import React from 'react';
import components from './index';

let factoriedComponents = {};

Object.keys(components).forEach(function (componentName) {
  if (componentName !== 'constants') {
    factoriedComponents[componentName] = React.createFactory(components[componentName]);
  } else {
    factoriedComponents[componentName] = components[componentName];
  }
});

export default factoriedComponents;
