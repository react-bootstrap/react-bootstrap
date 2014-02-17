/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var SplitButton = require('../cjs/SplitButton');
var MenuItem       = require('../cjs/MenuItem');

describe('SplitButton', function () {
  it('Should render button correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
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
    var instance = ReactTestUtils.renderIntoDocument(
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
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" dropdownTitle="New title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.equal(instance.refs.dropdownButton.getDOMNode().firstChild.innerText.trim(), 'New title');
  });

  it('Should pass props to button', function () {
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" bsStyle="primary" className="test-class" id="testid">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    var button = instance.refs.button.getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
    assert.ok(button.className.match(/\btest-class\b/));
    assert.equal(button.id, 'testid');
  });

  it('Should be closed by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('Should open when clicked', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );

    instance.componentDidUpdate = function () {
        assert.ok(instance.getDOMNode().className.match(/\bopen\b/));
        done();
    };

    ReactTestUtils.Simulate.click(instance.refs.dropdownButton.getDOMNode());
  });

  it('should call onSelect with key when MenuItem is clicked', function (done) {
    var handleSelect = function (key) {
          assert.equal(key, '1');
          done();
        },
        instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title" onSelect={handleSelect}>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </SplitButton>
    );
    ReactTestUtils.Simulate.click(instance.refs.menu.props.children[0].getDOMNode().firstChild);
  });

  describe('when open', function () {
    var instance;

    beforeEach(function (done) {
      instance = ReactTestUtils.renderIntoDocument(
        <SplitButton title="Title">
          <MenuItem key="1" ref="item1">MenuItem 1 content</MenuItem>
          <MenuItem key="2" ref="item2">MenuItem 2 content</MenuItem>
        </SplitButton>
      );

      instance.componentDidUpdate = function () {
        instance.componentDidUpdate = function () {};
        done();
      };

      instance.toggle();
    });

    it('should close when button is clicked', function (done) {
      instance.componentDidUpdate = function () {
        assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
        done();
      };

      ReactTestUtils.Simulate.click(instance.refs.dropdownButton.getDOMNode());
    });

  });
});