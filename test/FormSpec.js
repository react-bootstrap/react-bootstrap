import React from 'react';
import { shallow } from 'enzyme';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

describe('<Form>', () => {
  it('should support horizontal', () => {
    shallow(
      <Form horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('form.form-horizontal.my-form')
      .assertSingle(FormGroup);
  });

  it('should support inline', () => {
    shallow(
      <Form inline className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('form.form-inline.my-form')
      .assertSingle(FormGroup);
  });

  it('should support custom componentClass', () => {
    shallow(
      <Form componentClass="fieldset" horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .assertSingle('fieldset.form-horizontal.my-form')
      .assertSingle(FormGroup);
  });
});
