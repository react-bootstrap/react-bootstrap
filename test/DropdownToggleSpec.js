import React from 'react';
import { mount } from 'enzyme';

import DropdownToggle from '../src/DropdownToggle';

describe('<DropdownToggle>', () => {
  const simpleToggle = <DropdownToggle>herpa derpa</DropdownToggle>;

  it('renders toggle button', () => {
    mount(simpleToggle)
      .assertSingle(
        'button[aria-expanded=false].dropdown-toggle.btn.btn-primary',
      )
      .text()
      .should.equal('herpa derpa');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
    mount(simpleToggle).assertSingle('button[aria-haspopup=true]');
  });

  it('renders children', () => {
    mount(
      <DropdownToggle>
        <h3>herpa derpa</h3>
      </DropdownToggle>,
    )
      .assertSingle('h3')
      .text()
      .should.equal('herpa derpa');
  });

  it('forwards onClick handler', done => {
    const handleClick = event => {
      event.should.be.ok;
      done();
    };
    mount(
      <DropdownToggle
        open={false}
        title="click forwards"
        onClick={handleClick}
      />,
    ).simulate('click');
  });

  it('forwards id', () => {
    const id = 'testid';
    mount(<DropdownToggle id={id} />).assertSingle(`button#${id}`);
  });

  it('does not forward bsClass', () => {
    mount(
      <DropdownToggle
        bsPrefix="my-custom-bsClass"
        open={false}
        title="bsClass"
      />,
    ).assertSingle('.my-custom-bsClass.btn');
  });
});
