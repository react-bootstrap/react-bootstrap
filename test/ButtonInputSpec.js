import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ButtonInput from '../src/ButtonInput';
import {shouldWarn} from './helpers';

describe('ButtonInput', () =>{
  it('renders an input button element with type=button', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="danger" wrapperClassName="test" />
    );

    const node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.equal(node.getAttribute('type'), 'button');
    assert.equal(node.getAttribute('class'), 'btn btn-danger');
  });

  it('supports type=reset and type=submit', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="reset" />
    );

    let node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.equal(node.getAttribute('type'), 'reset');

    instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="submit" />
    );

    node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.equal(node.getAttribute('type'), 'submit');
  });

  it('throws warning about unsupported type', function () {
    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="password" />
    );

    shouldWarn('propType: Invalid');
  });

  it('must not throw warning when bsStyle=danger', function () {
    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="danger" />
    );

    console.warn.called.should.be.false;
  });

  it('throws warning about wrong type for bsStyle=error', function () {
    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="submit" />
    );

    shouldWarn('propType: Invalid');
  });

  it('throws a warning if given both children and a value property', function () {
    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button">button</ButtonInput>
    );

    shouldWarn('Both value and children');
  });

  it('does not throw an error for strings and numbers', function () {
    let testData = { children: 'EUREKA' };
    let result = ButtonInput.propTypes.children(testData, 'children', 'ButtonInput');
    assert.notInstanceOf(result, Error);

    testData = { value: 4 };
    result = ButtonInput.propTypes.value(testData, 'children', 'ButtonInput');
    assert.notInstanceOf(result, Error);
  });

  it('does not allow elements for children', function () {
    ReactTestUtils.renderIntoDocument(
      <ButtonInput><span>blah</span></ButtonInput>
    );

    shouldWarn('propType: Invalid');
  });
});
