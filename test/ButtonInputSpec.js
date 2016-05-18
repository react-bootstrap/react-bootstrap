import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import ButtonInput from '../src/ButtonInput';

import {shouldWarn} from './helpers';

describe('ButtonInput', () => {
  it('renders an input button element with type=button', () => {
    shouldWarn('deprecated');

    const instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="danger" wrapperClassName="test" />
    );

    const node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    assert.equal(node.getAttribute('type'), 'button');
    assert.equal(node.getAttribute('class'), 'btn btn-danger');
  });

  it('supports type=reset and type=submit', () => {
    shouldWarn('deprecated');

    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="reset" />
    );

    let node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    assert.equal(node.getAttribute('type'), 'reset');

    instance = ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="submit" />
    );

    node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    assert.equal(node.getAttribute('type'), 'submit');
  });

  it('throws warning about unsupported type', () => {
    shouldWarn('deprecated');
    shouldWarn('propType: Invalid');
    shouldWarn('Failed form propType');

    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" type="password" />
    );
  });

  it('must not throw warning when bsStyle=danger', () => {
    shouldWarn('deprecated');

    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="danger" />
    );
  });

  it('throws warning about wrong type for bsStyle=error', () => {
    shouldWarn('deprecated');
    shouldWarn('propType: Invalid');

    ReactTestUtils.renderIntoDocument(
      <ButtonInput value="button" bsStyle="submit" />
    );
  });

  it('throws a warning if given both children and a value property', () => {
    const testData = { value: 5, children: 'button' };
    const result = ButtonInput.propTypes.value(testData, 'value', 'ButtonInput');

    result.should.be.instanceOf(Error);
    result.message.should.have.string('value and children');
  });

  it('does not throw an error for strings and numbers', () => {
    let testData = { children: 'EUREKA' };
    let result = ButtonInput.propTypes.children(testData, 'children', 'ButtonInput');
    assert.notInstanceOf(result, Error);

    testData = { value: 4 };
    result = ButtonInput.propTypes.value(testData, 'children', 'ButtonInput');
    assert.notInstanceOf(result, Error);
  });

  it('allows elements as children', () => {
    shouldWarn('deprecated');

    ReactTestUtils.renderIntoDocument(
      <ButtonInput><span>blah</span></ButtonInput>
    );
  });
});
