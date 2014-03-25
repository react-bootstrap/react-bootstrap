/** @jsx React.DOM */
/*global document, describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var SplitButton    = require('../cjs/SplitButton');
var MenuItem       = require('../cjs/MenuItem');

describe('SplitButton', function () {
  var instance;
  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode().parent);
    }
  });

  it('Should render button correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    var button = instance.refs.button.getDOMNode();
    var dropdownButton = instance.refs.dropdownButton.getDOMNode();
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(dropdownButton.className.match(/\bdropdown-toggle\b/));
    assert.ok(dropdownButton.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
    assert.ok(dropdownButton.firstChild.className.match(/\bsr-only\b/));
    assert.equal(dropdownButton.firstChild.innerText.trim(), 'Toggle dropdown');
  });

  it('Should render menu correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    var menu = instance.refs.menu.getDOMNode();
    assert.ok(menu.className.match(/\bdropdown-menu\b/));
    assert.equal(menu.getAttribute('role'), 'menu');
    assert.equal(menu.firstChild.nodeName, 'LI');
    assert.equal(menu.firstChild.innerText, 'MenuItem 1 content');
    assert.equal(menu.lastChild.nodeName, 'LI');
    assert.equal(menu.lastChild.innerText, 'MenuItem 2 content');
  });

  it('Should pass dropdownTitle to dropdown button', function () {
    var CustomTitle = React.createClass({ render: function() { return <span />; } });
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title={<CustomTitle />} dropdownTitle={<CustomTitle />}>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.button, CustomTitle));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.dropdownButton, CustomTitle));
  });

  it('Should pass props to button', function () {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" bsStyle="primary">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    var button = instance.refs.button.getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
  });

  it('Should pass id to button group', function () {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" bsStyle="primary" id="testId">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.equal(instance.getDOMNode().getAttribute('id'), 'testId');
  });

  it('Should be closed by default', function () {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('Should open when clicked', function (done) {
    instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
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
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <SplitButton title="Title" onSelect={handleSelect}>
        <MenuItem key={1}>MenuItem 1 content</MenuItem>
        <MenuItem key={2}>MenuItem 2 content</MenuItem>
      </SplitButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('Should have dropup class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" dropdownTitle="New title" dropup>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.ok(instance.getDOMNode().className.match(/\bdropup\b/));
  });

  it('Should pass pullRight prop to menu', function () {
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" dropdownTitle="New title" pullRight>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.ok(instance.refs.menu.props.pullRight);
  });

  describe('when open', function () {
    beforeEach(function (done) {
      instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key={1}>MenuItem 1 content</MenuItem>
          <MenuItem key={2}>MenuItem 2 content</MenuItem>
        </SplitButton>
      );

      instance.setDropdownState(true, done);
    });

    it('should close when button is clicked', function (done) {
      instance.componentDidUpdate = function () {
        assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
        done();
      };

      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);
    });
  });
});