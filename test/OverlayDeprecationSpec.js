import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Position from '../src/Position';
import Transition from '../src/Transition';
import Portal from '../src/Portal';

import { shouldWarn } from './helpers';

describe('Components moved to react-overlays', ()=>{

  it('should warn about Position', ()=>{
    ReactTestUtils.renderIntoDocument(<Position><div/></Position>);

    shouldWarn(/Position component is deprecated/);
  });

  it('should warn about Transition', ()=>{
    ReactTestUtils.renderIntoDocument(<Transition><div/></Transition>);

    shouldWarn(/Transition component is deprecated/);
  });

  it('should warn about Portal', ()=>{
    ReactTestUtils.renderIntoDocument(<Portal><div/></Portal>);

    shouldWarn(/Portal component is deprecated/);
  });
});
