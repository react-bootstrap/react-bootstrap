import React from 'react';
import tsp from 'teaspoon';

import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    tsp(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    )
    .render()
    .find('input[type="checkbox"]')
    .length.should.equal(3);
  });

  it('should render radios', () => {
    tsp(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    )
    .render()
    .find('input[type="radio"]')
    .length.should.equal(3);
  });

  it('should select initial values', () => {
    tsp(
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    )
    .render()
    .find('input[checked]')
    .length.should.equal(2);
  });

  it('should return an array of values', () => {
    const spy = sinon.spy();
    tsp(
      <ToggleButtonGroup type="checkbox" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    )
    .render()
    .nth(1, 'input[type="checkbox"]')
    .trigger('change');

    spy.should.have.been.calledWith([2]);
  });

  it('should return a single value', () => {
    const spy = sinon.spy();
    tsp(
      <ToggleButtonGroup type="radio" name="items" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    )
    .render()
    .nth(1, 'input[type="radio"]')
    .trigger('change');

    spy.should.have.been.calledWith(2);
  });
});
