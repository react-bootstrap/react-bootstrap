import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import FormGroup from '../src/FormGroup';
import {shouldWarn} from './helpers';

describe('FormGroup', () => {
  it('renders children', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>
        <span className='child1' />
        <span className='child2' />
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

  // This test case must come first, since the error only gets logged once.
  it('throws no warning without bsSize when standalone', () => {
    ReactTestUtils.renderIntoDocument(
      <FormGroup standalone />
    );

    // Warning thrown above would lead to failure from index.
  });

  it('throws warning about bsSize when standalone', () => {
    ReactTestUtils.renderIntoDocument(
      <FormGroup standalone bsSize="large" />
    );

    shouldWarn('Failed propType: bsSize');
  });

  it('renders no form-group class when standalone', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup standalone>
        <span />
      </FormGroup>
    );

    assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'form-group').length, 0);
  });

  it('renders no form-group-* class when standalone', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup standalone bsSize="large" />
    );

    assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'form-group').length, 0);
    assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'form-group-lg').length, 0);
  });

  [{
    className: 'has-feedback',
    props: { hasFeedback: true }
  }, {
    className: 'has-success',
    props: { bsStyle: 'success' }
  }, {
    className: 'has-warning',
    props: { bsStyle: 'warning' }
  }, {
    className: 'has-error',
    props: { bsStyle: 'error' }
  }, {
    className: 'custom-group',
    props: { groupClassName: 'custom-group' }
  }].forEach( testCase => {
    it(`does not render ${testCase.className} class`, () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <FormGroup>
          <span />
        </FormGroup>
      );

      assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, testCase.className).length, 0);
    });

    it(`renders with ${testCase.className} class`, () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <FormGroup {...testCase.props}>
          <span />
        </FormGroup>
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, testCase.className));
    });
  });
});
