import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import RadioButton from '../../src/FormControls/RadioButton';

describe('FormControls.RadioButton', function () {
  it('does not apply htmlFor to the label if no id is provided', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton label="test" value="test" />
    );

    const label = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'label');
    should.not.exist(label.props.htmlFor);
  });

  it('does not apply htmlFor to the label if no id is provided', function () {
    const testId = 'thing';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton id={testId} label="test" value="test" />
    );

    const label = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'label');
    label.props.htmlFor.should.eql(testId);
  });

  it('does not render a label if no label prop is provided', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton value="test" />
    );

    React.findDOMNode(instance).tagName.toLowerCase().should.eql('input');
  });

  it('renders a label if label prop is provided', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton label="thing" value="test" />
    );

    ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'label');
  });

  it('renders a div around the label if not inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton label="thing" value="test" />
    );

    React.findDOMNode(instance).tagName.toLowerCase().should.equal('div');
  });

  it('should not wrap the label with a div if inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton inline label="thing" value="test" />
    );

    React.findDOMNode(instance).tagName.toLowerCase().should.equal('label');
  });

  it('should render the label prop', function () {
    const testText = 'thing';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton label={testText} value="test" />
    );

    React.findDOMNode(instance).textContent.should.equal(testText);
  });

  it('should render the children', () => {
    const testText = 'thing';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioButton value="test">
        {testText}
      </RadioButton>
    );

    React.findDOMNode(instance).textContent.should.equal(testText);
  });
});
