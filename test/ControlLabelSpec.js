import React from 'react';
import { mount, shallow } from 'enzyme';

import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormLabel>', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <FormLabel htmlFor="foo" className="my-control-label">
          Label
        </FormLabel>
      )
        .assertSingle('label.control-label.my-control-label[htmlFor="foo"]')
        .text()
    ).to.equal('Label');
  });

  it('should respect srOnly', () => {
    shallow(<FormLabel srOnly>Label</FormLabel>).assertSingle(
      'label.control-label.sr-only'
    );
  });

  it('should use controlId for htmlFor', () => {
    mount(
      <FormGroup controlId="foo">
        <FormLabel>Label</FormLabel>
      </FormGroup>
    ).assertSingle('label.control-label[htmlFor="foo"]');
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    mount(
      <FormGroup controlId="foo">
        <FormLabel htmlFor="bar">Label</FormLabel>
      </FormGroup>
    ).assertSingle('label.control-label[htmlFor="bar"]');
  });
});
