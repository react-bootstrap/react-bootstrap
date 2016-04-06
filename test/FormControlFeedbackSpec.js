import React from 'react';
import $ from 'teaspoon';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<FormControl.Feedback>', () => {
  it('should render default success', () => {
    $(
      <FormGroup validationState="success">
        <FormControl.Feedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-ok');
  });

  it('should render default warning', () => {
    $(
      <FormGroup validationState="warning">
        <FormControl.Feedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-warning-sign');
  });

  it('should render default error', () => {
    $(
      <FormGroup validationState="error">
        <FormControl.Feedback />
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-remove');
  });

  it('should render default validation state', () => {
    $(
      <FormGroup validationState="success">
        <div>
          <FormControl.Feedback />
        </div>
      </FormGroup>
    )
      .render()
      .single('.form-control-feedback.glyphicon-ok');
  });

  it('should render custom component', () => {
    function MyComponent(props) {
      return <div {...props} />;
    }

    $(
      <FormControl.Feedback>
        <MyComponent className="foo" />
      </FormControl.Feedback>
    )
      .render()
      .single($.s`${MyComponent}.foo.form-control-feedback`);
  });
});
