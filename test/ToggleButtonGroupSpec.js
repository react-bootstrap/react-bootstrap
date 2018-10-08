import React from 'react';
import { mount } from 'enzyme';

import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButton', () => {
  it('should forward refs to the label', () => {
    const ref = React.createRef();
    mount(
      <div>
        <ToggleButtonGroup.Button ref={ref} value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </div>,
    );

    ref.current.tagName.should.equal('LABEL');
  });

  it('should add an inputRef', () => {
    const ref = React.createRef();
    mount(
      <ToggleButtonGroup.Button inputRef={ref} value={3}>
        Option 3
      </ToggleButtonGroup.Button>,
    );

    ref.current.tagName.should.equal('INPUT');
  });
});

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    mount(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="checkbox"]')
      .length.should.equal(3);
  });

  it('should render radios', () => {
    mount(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="radio"]')
      .length.should.equal(3);
  });

  it('should select initial values', () => {
    mount(
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[checked=true]')
      .length.should.equal(2);
  });

  it('should disable radios', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1} disabled>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2} disabled>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper.find('input[disabled=true]').length.should.equal(2);
    wrapper.find('label.disabled').length.should.equal(2);
    wrapper.assertNone('label[disabled=true]');
  });

  it('should return an array of values', () => {
    const spy = sinon.spy();
    mount(
      <ToggleButtonGroup type="checkbox" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="checkbox"]')
      .at(1)
      .simulate('change');

    spy.should.have.been.calledWith([2]);
  });

  it('should return a single value', () => {
    const spy = sinon.spy();
    mount(
      <ToggleButtonGroup type="radio" name="items" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="radio"]')
      .at(1)
      .simulate('change');

    spy.should.have.been.calledWith(2);
  });
});
