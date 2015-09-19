import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import RadioButton from '../../src/FormControls/RadioButton';
import RadioGroup from '../../src/FormControls/RadioGroup';

describe('RadioGroup', function () {
  it('applies an on change to children', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test">
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'INPUT');
    buttons.every(button => button.props.onChange === instance.handleChange).should.be.true;
  });

  it('invokes a callback when a selection is changed', function() {
    const callback = sinon.spy();

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" onChange={callback}>
        <RadioButton label="thing" value="thing" id="thing" className="thing" />
        <RadioButton label="jeans" value="jeans" id="jeans" />
      </RadioGroup>
    );

    const thing = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'thing');
    ReactTestUtils.Simulate.change(thing, {target: {value: 5}});
    callback.should.have.been.calledWith(5);
  });

  it('applies the name property to all children', function () {
    const testName = 'test';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name={testName}>
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'INPUT');
    buttons.every(button => button.props.name === testName).should.be.true;
  });

  it('does not inline if the inline property is false', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" inline={false}>
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    const labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'DIV');
    labels.every(label => label.props.className === 'radio').should.be.true;
  });

  it('applies the radio-inline class when the inline prop is used', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" inline>
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    const labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'LABEL');
    labels.every(label => label.props.className === 'radio-inline').should.be.true;
  });

  it('applies the defaultValue', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" defaultValue="2" >
        <RadioButton label="thing" value="1" />
        <RadioButton className="theAnswer" label="pants" value="2" />
        <RadioButton label="jeans" value="3" />
      </RadioGroup>
    );

    const button = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'theAnswer');
    button.props.checked.should.be.true;
  });

  it('renders a legend when the prop is given', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" legend="thing">
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'legend').should.be.ok;
  });

  it('srOnly applies the sr-only class to the legend', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name="test" legend="thing" srOnly>
        <RadioButton label="thing" value="1" />
        <RadioButton label="pants" value="1" />
        <RadioButton label="jeans" value="1" />
      </RadioGroup>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only').should.be.ok;
  });
});
