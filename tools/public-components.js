import React from 'react';
import * as index from '../src/index';

let components = [];
Object.keys(index).forEach(function (item) {
  if (index[item] instanceof React.Component.constructor) {
    components.push(item);
  }
});

export default components;
