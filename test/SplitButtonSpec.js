import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SplitButton from '../src/SplitButton';
import MenuItem from '../src/MenuItem';
import Button from '../src/Button';

describe('SplitButton', function() {
  const simple = (
    <SplitButton title='Title' id='test-id'>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', function () {
    const instance = ReactTestUtils.renderIntoDocument(simple);

    const toggleNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown-toggle'));
    const splitButtonNode = React.findDOMNode(instance);

    splitButtonNode.className.should.not.match(/open/);
    ReactTestUtils.Simulate.click(toggleNode);
    splitButtonNode.className.should.match(/open/);
  });

  it('should not open the menu when other button is clicked', function() {
    const instance = ReactTestUtils.renderIntoDocument(simple);

    const buttonNode = React.findDOMNode(ReactTestUtils.scryRenderedComponentsWithType(instance, Button)[0]);
    const splitButtonNode = React.findDOMNode(instance);

    splitButtonNode.className.should.not.match(/open/);
    ReactTestUtils.Simulate.click(buttonNode);
    splitButtonNode.className.should.not.match(/open/);
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', function(done) {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title='Title' id='test-id' onClick={ () => done() }>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const buttonNode = React.findDOMNode(ReactTestUtils.scryRenderedComponentsWithType(instance, Button)[0]);
    ReactTestUtils.Simulate.click(buttonNode);
  });

  it('should invoke onClick when SplitButton.Button is clicked (child)', function(done) {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton id='test-id'>
        <SplitButton.Button onClick={ () => done() }>Title</SplitButton.Button>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const buttons = ReactTestUtils.scryRenderedComponentsWithType(instance, SplitButton.Button);

    const buttonNode = React.findDOMNode(buttons[0]);
    ReactTestUtils.Simulate.click(buttonNode);
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', function(done) {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title='Title' id='test-id'
        onClick={ () => done(new Error('Should not get called')) }>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown-toggle'));
    ReactTestUtils.Simulate.click(toggleNode);
    setTimeout(done, 100);
  });

  it('should invoke onClick when SplitButton.Toggle is clicked (child)');

  it('should fail prop validation if title prop or SplitButton.Button child is not provided');

  // TODO: From old specs
  it('Should pass disabled to both buttons');

  it('Should set target attribute on anchor');
});
