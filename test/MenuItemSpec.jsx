/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var MenuItem        = require('../cjs/MenuItem');


describe('MenuItem', function () {
  it('should output an li', function () {
    var instance = ReactTestUtils.renderIntoDocument(MenuItem({}, 'Title'));
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
          <MenuItem>Title</MenuItem>
        );

    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('tabIndex'), '-1');
  });

  it('should fire callback on click of link', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(
          MenuItem({
            key: 1,
            onSelect: function (key) {
              assert.equal(key, 1);
              done();
            }
          }, 'Title')
        );
    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchor);
  });

  it('should be a divider with no children', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          MenuItem({
            divider: true
          }, 'Title')
        );

    assert(instance.getDOMNode().className.match(/\bdivider\b/), 'Has no divider class');
    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('should be a header with no anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          MenuItem({
            header: true
          }, 'Title')
        );

    assert(instance.getDOMNode().className.match(/\bdropdown-header\b/), 'Has no header class');
    assert.equal(instance.getDOMNode().innerHTML, 'Title');
  });
});


