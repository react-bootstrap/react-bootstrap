/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var DropdownButton = require('../cjs/DropdownButton');
var MenuItem       = require('../cjs/MenuItem');
var DropdownMenu   = require('../cjs/DropdownMenu');
var Button         = require('../cjs/Button');

describe('DropdownButton', function () {
  var instance;

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode().parent);
    }
  });

  it('Should render button correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class">
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.ok(button.className.match(/\btest-class\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('Should render menu correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu);
    var allMenuItems = ReactTestUtils.scryRenderedComponentsWithType(menu, MenuItem);
    assert.equal(allMenuItems.length, 2);
  });

  it('Should pass props to button', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" bsStyle="primary" id="testId" disabled>
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
    assert.equal(button.getAttribute('id'), 'testId');
    assert.ok(button.disabled);
  });

  it('Should be closed by default', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>);

    assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('Should open when clicked', function (done) {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    instance.componentDidUpdate = function () {
      assert.ok(instance.getDOMNode().className.match(/\bopen\b/));
      done();
    };

    ReactTestUtils.SimulateNative.click(instance.refs.dropdownButton.getDOMNode());
  });

  it('should call onSelect with key when MenuItem is clicked', function (done) {
    function handleSelect(key) {
      assert.equal(key, 2);
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" onSelect={handleSelect}>
        <MenuItem key={1}>MenuItem 1 content</MenuItem>
        <MenuItem key={2}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should call MenuItem onSelect with key when MenuItem is clicked', function (done) {
    function handleSelect(key) {
      assert.equal(key, 2);
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem key={1}>MenuItem 1 content</MenuItem>
        <MenuItem key={2} onSelect={handleSelect}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should not set onSelect to child with no onSelect prop', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem key={1}>MenuItem 1 content</MenuItem>
        <MenuItem key={2}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.notOk(menuItems[0].props.onSelect);
  });

  describe('when open', function () {
    beforeEach(function (done) {
      instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title">
          <MenuItem key={1}>MenuItem 1 content</MenuItem>
          <MenuItem key={2}>MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

      instance.setDropdownState(true, done);
    });

    it('should close on click', function (done) {
      instance.componentDidUpdate = function () {
        assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
        done();
      };

      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);
    });
  });

  it('Should render li when in nav', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class" navItem>
        <MenuItem key="1">MenuItem 1 content</MenuItem>
        <MenuItem key="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var li = instance.getDOMNode();
    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bdropdown\b/));
    assert.ok(button.className.match(/\btest-class\b/));
    assert.equal(button.nodeName, 'A');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });
});