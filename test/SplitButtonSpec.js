import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SplitButton from '../src/SplitButton';
import MenuItem from '../src/MenuItem';
import Button from '../src/Button';

describe('SplitButton', function () {
  let instance;
  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
    }
  });

  it('Should render button correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    let button = instance.refs.button.getDOMNode();
    let dropdownButton = instance.refs.dropdownButton.getDOMNode();
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(dropdownButton.className.match(/\bdropdown-toggle\b/));
    assert.equal(button.innerText.trim(), 'Title');
    assert.ok(dropdownButton.childNodes[0].className.match(/\bsr-only\b/));
    assert.equal(dropdownButton.childNodes[0].innerText.trim(), 'Toggle dropdown');
    assert.ok(dropdownButton.childNodes[1].className.match(/\bcaret\b/));
    assert.equal(dropdownButton.childNodes[2].style.letterSpacing, '-0.3em');
    assert.equal(dropdownButton.childNodes.length, 3);
  });

  it('Should render menu correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    let menu = instance.refs.menu.getDOMNode();
    assert.ok(menu.className.match(/\bdropdown-menu\b/));
    assert.equal(menu.getAttribute('role'), 'menu');
    assert.equal(menu.firstChild.nodeName, 'LI');
    assert.equal(menu.firstChild.innerText, 'MenuItem 1 content');
    assert.equal(menu.lastChild.nodeName, 'LI');
    assert.equal(menu.lastChild.innerText, 'MenuItem 2 content');
  });

  it('Should pass dropdownTitle to dropdown button', function () {
    let CustomTitle = React.createClass({ render() { return <span />; } });
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title={<CustomTitle />} dropdownTitle={<CustomTitle />}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.button, CustomTitle));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.dropdownButton, CustomTitle));
  });

  it('Should pass props to button', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" bsStyle="primary">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    let button = instance.refs.button.getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
  });

  it('Should pass disabled to both buttons', function() {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Test" disabled={true}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    let button = instance.refs.button.getDOMNode();
    assert.ok(button.disabled);
    let dropdownButton = instance.refs.dropdownButton.getDOMNode();
    assert.ok(dropdownButton.disabled);
  });

  it('Should pass id to button group', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" bsStyle="primary" id="testId">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    assert.equal(instance.getDOMNode().getAttribute('id'), 'testId');
  });

  it('Should be closed by default', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('Should open when clicked', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    ReactTestUtils.SimulateNative.click(instance.refs.dropdownButton.getDOMNode());

    assert.ok(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('should call onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" onSelect={handleSelect}>
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2'>MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('Should have dropup class', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" dropdownTitle="New title" dropup>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    assert.ok(instance.getDOMNode().className.match(/\bdropup\b/));
  });

  it('Should pass pullRight prop to menu', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" dropdownTitle="New title" pullRight>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    assert.ok(instance.refs.menu.props.pullRight);
  });

  it('Should set target attribute on anchor', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" dropdownTitle="New title" href="/some/unique-thing/" target="_blank">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    let anchors = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    assert.equal(anchors.length, 2);
    let linkElement = anchors[0].getDOMNode();
    assert.equal(linkElement.target, '_blank');
  });

  it('Should call `onClick` with target attribute', function (done) {
    function handleClick(key, href, target) {
      assert.equal(target, '_blank');
      done();
    }
    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" dropdownTitle="New title" href="/some/unique-thing/" target="_blank" onClick={handleClick}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    let buttons = ReactTestUtils.scryRenderedComponentsWithType(instance, Button);
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(buttons[0], 'a'));
  });

  describe('when open', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
          <MenuItem eventKey={2}>MenuItem 2 content</MenuItem>
        </SplitButton>
      );

      instance.setDropdownState(true);
    });

    it('should close when button is clicked', function () {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
    });
  });
});
