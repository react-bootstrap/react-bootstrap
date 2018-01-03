import React from 'react';
import { mount } from 'enzyme';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<FormControl.Feedback>', () => {
  it('should render default success', () => {
    mount(
      <FormGroup validationState="success">
        <FormControl.Feedback />
      </FormGroup>
    ).assertSingle('.form-control-feedback.glyphicon-ok');
  });

  it('should render default warning', () => {
    mount(
      <FormGroup validationState="warning">
        <FormControl.Feedback />
      </FormGroup>
    ).assertSingle('.form-control-feedback.glyphicon-warning-sign');
  });

  it('should render default error', () => {
    mount(
      <FormGroup validationState="error">
        <FormControl.Feedback />
      </FormGroup>
    ).assertSingle('.form-control-feedback.glyphicon-remove');
  });

  it('should render default validation state', () => {
    mount(
      <FormGroup validationState="success">
        <div>
          <FormControl.Feedback />
        </div>
      </FormGroup>
    ).assertSingle('.form-control-feedback.glyphicon-ok');
  });

  it('should render custom component', () => {
    function MyComponent(props) {
      return <div {...props} />;
    }

    mount(
      <FormControl.Feedback>
        <MyComponent className="foo" />
      </FormControl.Feedback>
    ).assertSingle('MyComponent.foo.form-control-feedback');
  });
});
