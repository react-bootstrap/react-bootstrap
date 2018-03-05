import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SplitButton from '../src/SplitButton';
import MenuItem from '../src/MenuItem';
import Button from '../src/Button';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton title="Title" id="test-id">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', () => {
    const instance = ReactTestUtils.renderIntoDocument(simple);

    const toggleNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );
    const splitButtonNode = ReactDOM.findDOMNode(instance);

    splitButtonNode.className.should.not.match(/open/);
    ReactTestUtils.Simulate.click(toggleNode);
    splitButtonNode.className.should.match(/open/);
  });

  it('should not open the menu when other button is clicked', () => {
    const instance = ReactTestUtils.renderIntoDocument(simple);

    const buttonNode = ReactDOM.findDOMNode(
      ReactTestUtils.scryRenderedComponentsWithType(instance, Button)[0]
    );
    const splitButtonNode = ReactDOM.findDOMNode(instance);

    splitButtonNode.className.should.not.match(/open/);
    ReactTestUtils.Simulate.click(buttonNode);
    splitButtonNode.className.should.not.match(/open/);
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', done => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" id="test-id" onClick={() => done()}>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const buttonNode = ReactDOM.findDOMNode(
      ReactTestUtils.scryRenderedComponentsWithType(instance, Button)[0]
    );
    ReactTestUtils.Simulate.click(buttonNode);
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', done => {
    let onClickSpy = sinon.spy();

    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" id="test-id" onClick={onClickSpy}>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );

    ReactTestUtils.Simulate.click(toggleNode);

    setTimeout(() => {
      onClickSpy.should.not.have.been.called;
      done();
    }, 10);
  });

  it('Should pass disabled to both buttons', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" id="test-id" disabled>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );

    const buttonNode = ReactDOM.findDOMNode(
      ReactTestUtils.scryRenderedComponentsWithType(instance, Button)[0]
    );

    expect(toggleNode.disabled).to.be.true;
    expect(buttonNode.disabled).to.be.true;
  });

  it('Should set target attribute on anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton
        title="Title"
        id="test-id"
        href="/some/unique-thing/"
        target="_blank"
      >
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    let anchors = ReactTestUtils.scryRenderedDOMComponentsWithTag(
      instance,
      'a'
    );
    let linkElement = anchors[0];

    assert.equal(linkElement.target, '_blank');
  });

  it('should set aria-label on toggle from title', () => {
    const instance = ReactTestUtils.renderIntoDocument(simple);

    const toggleNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );
    expect(toggleNode.getAttribute('aria-label')).to.equal('Title');
  });

  it('should set aria-label on toggle from toggleLabel', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );
    expect(toggleNode.getAttribute('aria-label')).to.equal('Label');
  });

  it('should derive bsClass from parent', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="title" id="test-id" bsClass="my-dropdown">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'my-dropdown-toggle'
      )
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'my-dropdown-menu'
      )
    );
  });
});
