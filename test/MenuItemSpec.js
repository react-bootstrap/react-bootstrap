import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MenuItem from '../src/MenuItem';

describe('MenuItem', function () {
  it('should output an li', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>
        Title
      </MenuItem>
    );
    assert.equal(instance.getDOMNode().nodeName, 'LI');
    assert.equal(instance.getDOMNode().getAttribute('role'), 'presentation');
  });

  it('should pass through props', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        active={true}>
        Title
      </MenuItem>
    );

    let node = instance.getDOMNode();
    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);
    assert.ok(node.className.match(/\bactive\b/));

    let anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
  });

  it('should have an anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>
        Title
      </MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('tabIndex'), null);
    assert.equal(anchor.getDOMNode().getAttribute('role'), 'menuitem');
  });

  it('should have have a tabIndex if supplied', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem tabIndex='1'>
        Title
      </MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('tabIndex'), '1');
  });

  it('should fire callback on click of link', function (done) {
    let selectOp = function (selectedKey) {
      assert.equal(selectedKey, '1');
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem eventKey='1' onSelect={selectOp}>
        Title
      </MenuItem>
    );
    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchor);
  });

  it('should be a divider with no children', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem divider>
        Title
      </MenuItem>
    );

    assert(instance.getDOMNode().className.match(/\bdivider\b/), 'Has no divider class');
    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('should be a header with no anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem header>
        Title
      </MenuItem>
    );

    assert(instance.getDOMNode().className.match(/\bdropdown-header\b/), 'Has no header class');
    assert.equal(instance.getDOMNode().innerHTML, 'Title');
  });

  it('Should set target attribute on anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem target="_blank">
        Title
      </MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('target'), '_blank');
  });

  it('Should call `onSelect` with target attribute', function (done) {
    function handleSelect(key, href, target) {
      assert.equal(href, 'link');
      assert.equal(target, '_blank');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} target="_blank" href="link">
        Title
      </MenuItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });
});
