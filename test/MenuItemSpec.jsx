/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var MenuItem       = require('../lib/MenuItem');


describe('MenuItem', function () {
  it('should output an li', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>
        Title
      </MenuItem>
    );
    assert.equal(instance.getDOMNode().nodeName, 'LI');
    assert.equal(instance.getDOMNode().getAttribute('role'), 'presentation');
  });

  it('should pass through props', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!">
        Title
      </MenuItem>
    );

    var node = instance.getDOMNode();
    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);

    var anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
  });

  it('should have an anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>
        Title
      </MenuItem>
    );

    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('tabIndex'), '-1');
  });

  it('should fire callback on click of link', function (done) {
    var selectOp = function (selectedKey) {
      assert.equal(selectedKey, '1');
      done();
    };
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem eventKey='1' onSelect={selectOp}>
        Title
      </MenuItem>
    );
    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchor);
  });

  it('should be a divider with no children', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem divider>
        Title
      </MenuItem>
    );

    assert(instance.getDOMNode().className.match(/\bdivider\b/), 'Has no divider class');
    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('should be a header with no anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem header>
        Title
      </MenuItem>
    );

    assert(instance.getDOMNode().className.match(/\bdropdown-header\b/), 'Has no header class');
    assert.equal(instance.getDOMNode().innerHTML, 'Title');
  });

  it('Should set target attribute on anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem target="_blank">
        Title
      </MenuItem>
    );

    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('target'), '_blank');
  });

  it('Should call `onSelect` with target attribute', function (done) {
    function handleSelect(key, href, target) {
      assert.equal(href, 'link');
      assert.equal(target, '_blank');
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} target="_blank" href="link">
        Title
      </MenuItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });
});


