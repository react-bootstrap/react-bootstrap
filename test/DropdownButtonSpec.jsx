/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var DropdownButton = require('../cjs/DropdownButton');
var MenuItem       = require('../cjs/MenuItem');

describe('DropdownButton', function () {
  it('Should render button correctly', function () {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);

    var button = instance.refs.button.getDOMNode();
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('Should render menu correctly', function () {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);

    var menu = instance.refs.menu.getDOMNode();
    assert.ok(menu.className.match(/\bdropdown-menu\b/));
    assert.equal(menu.getAttribute('role'), 'menu');
    assert.equal(menu.firstChild.nodeName, 'LI');
    assert.equal(menu.firstChild.innerText, 'MenuItem 1 content');
    assert.equal(menu.lastChild.nodeName, 'LI');
    assert.equal(menu.lastChild.innerText, 'MenuItem 2 content');
  });

  it('Should pass props to button', function () {
    var instance = (
        <DropdownButton title="Title" bsStyle="primary" className="test-class" id="testid">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);

    var button = instance.refs.button.getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
    assert.ok(button.className.match(/\btest-class\b/));
    assert.equal(button.id, 'testid');
  });

  it('Should be closed by default', function () {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);

    assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
  });

  it('Should open when clicked', function (done) {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    instance.componentDidUpdate = function () {
        assert.ok(instance.getDOMNode().className.match(/\bopen\b/));
        done();
    };

    ReactTestUtils.renderIntoDocument(instance);

    ReactTestUtils.Simulate.click(instance.refs.button.getDOMNode());
  });

  it('should call onSelect with key when MenuItem is clicked', function (done) {
    var handleSelect = function (key) {
          assert.equal(key, '1');
          done();
        },
        instance = (
        <DropdownButton title="Title" onSelect={handleSelect}>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(instance.refs.menu.props.children[0].getDOMNode().firstChild);
  });

  describe('when open', function () {
    var instance;

    beforeEach(function (done) {
      instance = (
        <DropdownButton title="Title">
          <MenuItem key="1" ref="item1">MenuItem 1 content</MenuItem>
          <MenuItem key="2" ref="item2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

      instance.componentDidUpdate = function () {
        instance.componentDidUpdate = function () {};
        done();
      };

      ReactTestUtils.renderIntoDocument(instance);
      instance.toggle();
    });

    it('should close when button is clicked', function (done) {
      instance.componentDidUpdate = function () {
        assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
        done();
      };

      ReactTestUtils.Simulate.click(instance.refs.button.getDOMNode());
    });

    // TODO: Work out why this throws an error
    // it('should close when MenuItem is clicked', function (done) {
    //   instance.componentDidUpdate = function () {
    //     assert.notOk(instance.getDOMNode().className.match(/\bopen\b/));
    //     done();
    //   };

    //   document.body.dispatchEvent(new Event('click', {
    //     'view': window,
    //     'bubbles': true,
    //     'cancelable': true,
    //     keyCode: 27
    //   }));
    // });

  });
});