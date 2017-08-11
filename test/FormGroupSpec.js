import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'teaspoon';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<FormGroup>', () => {
  it('renders children', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>
        <span className="child1" />
        <span className="child2" />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'child1'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'child2'));
  });

  it('renders with form-group class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>
        <span />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
  });

  it('renders form-group with sm or lg class when bsSize is small or large', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup bsSize="small">
        <span />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group-sm'));

    instance = ReactTestUtils.renderIntoDocument(
      <FormGroup bsSize="large">
        <span />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group-lg'));
  });

  [
    {
      props: { validationState: 'success' },
      className: 'has-success',
    },
    {
      props: { validationState: 'warning' },
      className: 'has-warning',
    },
    {
      props: { validationState: 'error' },
      className: 'has-error',
    },
    {
      props: { className: 'custom-group' },
      className: 'custom-group',
    },
  ].forEach(({ props, className }) => {
    it(`does not render ${className} class`, () => {
      $(
        <FormGroup>
          <span />
        </FormGroup>
      )
        .shallowRender()
        .none(`.${className}`);
    });

    it(`renders with ${className} class`, () => {
      $(
        <FormGroup {...props}>
          <span />
        </FormGroup>
      )
        .shallowRender()
        .single(`.${className}`);
    });
  });

  describe('feedback', () => {
    it('should not have feedback without feedback component', () => {
      $(
        <FormGroup validationState="success" />
      )
        .shallowRender()
        .none('.has-feedback');
    });

    it('should have feedback with feedback component', () => {
      $(
        <FormGroup validationState="success">
          <FormControl.Feedback />
        </FormGroup>
      )
        .shallowRender()
        .single('.has-feedback');
    });

    it('should have feedback with nested feedback component', () => {
      $(
        <FormGroup validationState="success">
          <div>
            <FormControl.Feedback />
          </div>
        </FormGroup>
      )
        .shallowRender()
        .single('.has-feedback');
    });

    it('should have feedback with custom feedback component', () => {
      $(
        <FormGroup validationState="success">
          <div bsRole="feedback" />
        </FormGroup>
      )
        .shallowRender()
        .single('.has-feedback');
    });
  });
});
