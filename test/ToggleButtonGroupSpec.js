import * as React from 'react';
import { mount } from 'enzyme';

import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButton', () => {
  it('should forward refs to the label', () => {
    const ref = React.createRef();
    mount(
      <div>
        <ToggleButtonGroup.Button id="id" ref={ref} value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </div>,
    );

    ref.current.tagName.should.equal('LABEL');
  });

  it('should add an inputRef', () => {
    const ref = React.createRef();
    mount(
      <ToggleButtonGroup.Button id="id" inputRef={ref} value={3}>
        Option 3
      </ToggleButtonGroup.Button>,
    );

    ref.current.tagName.should.equal('INPUT');
  });
});

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper.assertSingle('.btn-group').assertNone('.btn-group-vertical');
    wrapper.find('input[type="checkbox"]').length.should.equal(3);
  });

  it('should render checkboxes vertically', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="checkbox" vertical>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper.assertSingle('.btn-group-vertical').assertNone('.btn-group');
    wrapper.find('input[type="checkbox"]').length.should.equal(3);
  });

  it('should render checkboxes vertically and small', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="checkbox" vertical size="sm">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper
      .assertSingle('.btn-group-vertical.btn-group-sm')
      .assertNone('.btn-group');
    wrapper.find('input[type="checkbox"]').length.should.equal(3);
  });

  it('should render checkboxes vertically and large', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="checkbox" vertical size="lg">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper
      .assertSingle('.btn-group-vertical.btn-group-lg')
      .assertNone('.btn-group');
    wrapper.find('input[type="checkbox"]').length.should.equal(3);
  });

  it('should render radios', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper.assertSingle('.btn-group').assertNone('btn-group-vertical');
    wrapper.find('input[type="radio"]').length.should.equal(3);
  });

  it('should render radios vertically', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items" vertical>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper.assertSingle('.btn-group-vertical').assertNone('.btn-group');
    wrapper.find('input[type="radio"]').length.should.equal(3);
  });

  it('should render radios vertically and small', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items" vertical size="sm">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper
      .assertSingle('.btn-group-vertical.btn-group-sm')
      .assertNone('.btn-group');
    wrapper.find('input[type="radio"]').length.should.equal(3);
  });

  it('should render radios vertically and large', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items" vertical size="lg">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    wrapper
      .assertSingle('.btn-group-vertical.btn-group-lg')
      .assertNone('.btn-group');
    wrapper.find('input[type="radio"]').length.should.equal(3);
  });

  it('should select initial values', () => {
    mount(
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[checked=true]')
      .length.should.equal(2);
  });

  it('should disable radios', () => {
    const wrapper = mount(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button id="id1" value={1} disabled>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2} disabled>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
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
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
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
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="radio"]')
      .at(1)
      .simulate('change');

    spy.should.have.been.calledWith(2);
  });

  it('should filter out value when deselected', () => {
    const spy = sinon.spy();
    mount(
      <ToggleButtonGroup
        type="checkbox"
        name="items"
        defaultValue={[1, 2]}
        onChange={spy}
      >
        <ToggleButtonGroup.Button id="id2" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    )
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change');

    spy.should.have.been.calledWith([2]);
  });
});
