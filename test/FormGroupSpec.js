import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import FormGroup from '../src/FormGroup';

describe('FormGroup', function() {
  it('renders children', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>
        <span className='child1' />
        <span className='child2' />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'child1'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'child2'));
  });

  it('renders with form-group class', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>
        <span />
      </FormGroup>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
  });

  it('renders no form-group class when standalone', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup standalone>
        <span />
      </FormGroup>
    );

    assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'form-group').length, 0);
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
  }
  ].forEach(function(testCase) {
    it(`does not render ${testCase.className} class`, function() {
      let instance = ReactTestUtils.renderIntoDocument(
        <FormGroup>
          <span />
        </FormGroup>
      );

      assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, testCase.className).length, 0);
    });

    it(`renders with ${testCase.className} class`, function() {
      let instance = ReactTestUtils.renderIntoDocument(
        <FormGroup {...testCase.props}>
          <span />
        </FormGroup>
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, testCase.className));
    });
  });
});
