import React from 'react';
import { mount, shallow } from 'enzyme';

import ControlLabel from '../src/ControlLabel';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<ControlLabel>', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <ControlLabel htmlFor="foo" className="my-control-label">
          Label
        </ControlLabel>
      )
        .assertSingle('label.control-label.my-control-label[htmlFor="foo"]')
        .text()
    ).to.equal('Label');
  });

  it('should respect srOnly', () => {
    shallow(<ControlLabel srOnly>Label</ControlLabel>).assertSingle(
      'label.control-label.sr-only'
    );
  });

  it('should use controlId for htmlFor', () => {
    mount(
      <FormGroup controlId="foo">
        <ControlLabel>Label</ControlLabel>
      </FormGroup>
    ).assertSingle('label.control-label[htmlFor="foo"]');
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    mount(
      <FormGroup controlId="foo">
        <ControlLabel htmlFor="bar">Label</ControlLabel>
      </FormGroup>
    ).assertSingle('label.control-label[htmlFor="bar"]');
  });
});
