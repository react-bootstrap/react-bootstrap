import React from 'react';
import $ from 'teaspoon';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

describe('<Form>', () => {
  it('should support horizontal', () => {
    $(
      <Form horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .shallowRender()
      .single('form.form-horizontal.my-form')
        .single(FormGroup);
  });

  it('should support inline', () => {
    $(
      <Form inline className="my-form">
        <FormGroup />
      </Form>
    )
      .shallowRender()
      .single('form.form-inline.my-form')
        .single(FormGroup);
  });

  it('should support custom componentClass', () => {
    $(
      <Form componentClass="fieldset" horizontal className="my-form">
        <FormGroup />
      </Form>
    )
      .shallowRender()
      .single('fieldset.form-horizontal.my-form')
        .single(FormGroup);
  });
});
