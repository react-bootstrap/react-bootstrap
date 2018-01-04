import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Dropdown from '../src/Dropdown';
import DropdownButton from '../src/DropdownButton';
import DropdownMenu from '../src/DropdownMenu';
import DropdownToggle from '../src/DropdownToggle';
import MenuItem from '../src/MenuItem';

describe('<DropdownButton>', () => {
  const simpleDropdown = (
    <DropdownButton title="Simple Dropdown" id="test-id">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownButton>
  );

  it('renders title prop', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    buttonNode.textContent.should.match(/Simple Dropdown/);
  });

  it('renders dropdown toggle button', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);

    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('renders single MenuItem child', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Single child" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );

    const menuNode = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu)
    );

    expect(menuNode.children.length).to.equal(1);
  });

  it('forwards pullRight to menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton pullRight title="blah" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const menu = ReactTestUtils.findRenderedComponentWithType(
      instance,
      DropdownMenu
    );

    menu.props.pullRight.should.be.true;
  });

  it('renders bsSize', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="blah" bsSize="small" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bbtn-group-sm\b/);
  });

  it('renders bsStyle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="blah" bsStyle="success" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    buttonNode.className.should.match(/\bbtn-success\b/);
  });

  it('forwards onSelect handler to MenuItems', done => {
    const selectedEvents = [];

    const onSelect = eventKey => {
      selectedEvents.push(eventKey);

      if (selectedEvents.length === 4) {
        selectedEvents.should.eql(['1', '2', '3', '4']);
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Simple Dropdown" onSelect={onSelect} id="test-id">
        <MenuItem eventKey="1">Item 1</MenuItem>
        <MenuItem eventKey="2">Item 2</MenuItem>
        <MenuItem eventKey="3">Item 3</MenuItem>
        <MenuItem eventKey="4">Item 4</MenuItem>
      </DropdownButton>
    );

    const menuItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(
      instance,
      'A'
    );

    menuItems.forEach(item => {
      ReactTestUtils.Simulate.click(item);
    });
  });

  it('closes when child MenuItem is selected', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Simple Dropdown" id="test-id">
        <MenuItem eventKey="1">Item 1</MenuItem>
      </DropdownButton>
    );

    const node = ReactDOM.findDOMNode(instance);

    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );
    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);

    const menuItem = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );
    ReactTestUtils.Simulate.click(menuItem);
    node.className.should.not.match(/\bopen\b/);
  });

  it('does not close when onToggle is controlled', () => {
    const handleSelect = () => {};

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton
        title="Simple Dropdown"
        open
        onToggle={handleSelect}
        id="test-id"
      >
        <MenuItem eventKey="1">Item 1</MenuItem>
      </DropdownButton>
    );

    const node = ReactDOM.findDOMNode(instance);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    const menuItem = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);

    node.className.should.match(/\bopen\b/);
  });

  it('Should pass props to button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" bsStyle="primary" id="testId" disabled>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    assert.ok(buttonNode.className.match(/\bbtn-primary\b/));
    assert.equal(buttonNode.getAttribute('id'), 'testId');
    assert.ok(buttonNode.disabled);
  });

  it('should derive bsClass from parent', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="title" id="test-id" bsClass="my-dropdown">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
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

  it('should pass defaultOpen to `<Dropdown>`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton id="test-id" title="title" defaultOpen>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
    );

    const dropdown = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Dropdown
    );
    const toggle = ReactTestUtils.findRenderedComponentWithType(
      instance,
      DropdownToggle
    );

    expect(dropdown.props.defaultOpen).to.equal(true);
    expect(toggle.props.defaultOpen).to.not.exist;
  });

  it('should pass onMouseEnter and onMouseLeave to `<Dropdown>`', () => {
    const onMouseEnter = () => {};
    const onMouseLeave = () => {};

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton
        id="test-id"
        title="title"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
    );

    const dropdown = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Dropdown
    );
    const toggle = ReactTestUtils.findRenderedComponentWithType(
      instance,
      DropdownToggle
    );

    expect(dropdown.props.onMouseEnter).to.equal(onMouseEnter);
    expect(dropdown.props.onMouseLeave).to.equal(onMouseLeave);

    expect(toggle.props.onMouseEnter).to.not.exist;
    expect(toggle.props.onMouseLeave).to.not.exist;
  });
});
