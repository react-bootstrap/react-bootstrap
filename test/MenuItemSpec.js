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
    assert.equal(React.findDOMNode(instance).nodeName, 'LI');
    assert.equal(React.findDOMNode(instance).getAttribute('role'), 'presentation');
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

    let node = React.findDOMNode(instance);
    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);
    assert.ok(node.className.match(/\bactive\b/));

    let anchorNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
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

    assert(React.findDOMNode(instance).className.match(/\bdivider\b/), 'Has no divider class');
    assert.equal(React.findDOMNode(instance).innerText, '');
  });

  it('should be a header with no anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem header>
        Title
      </MenuItem>
    );

    assert(React.findDOMNode(instance).className.match(/\bdropdown-header\b/), 'Has no header class');
    assert.equal(React.findDOMNode(instance).innerHTML, 'Title');
  });

  it('Should set target attribute on anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem target="_blank">
        Title
      </MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(React.findDOMNode(anchor).getAttribute('target'), '_blank');
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

  it('Should be `disabled` link', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem disabled>
        Title
      </MenuItem>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  describe('customAnchor property', function () {
    it('renders own anchor by default', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <MenuItem>
          Title
        </MenuItem>
      );

      let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
      assert.equal(React.findDOMNode(anchor).getAttribute('tabIndex'), '-1');
    });

    it('uses a child as anchor component with "customAnchor" set', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <MenuItem customAnchor>
          <a className='my-custom'>
            Title
          </a>
        </MenuItem>
      );

      assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'my-custom').length, 1);
      assert.equal(React.findDOMNode(instance).children[0].className, 'my-custom');
    });

    it('should call `onSelect` with click on a custom child anchor', function (done) {
      function handleSelect(key, href, target) {
        assert.equal(href, 'link');
        assert.equal(target, '_blank');
        done();
      }
      let instance = ReactTestUtils.renderIntoDocument(
        <MenuItem customAnchor onSelect={handleSelect} target="_blank" href="link">
          <a>Title</a>
        </MenuItem>
      );
      ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    });

    it('passes anchor props onto a child anchor', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <MenuItem customAnchor
          href='/song.ogg'
          target='_blank'
          title='title for menu item'
          className='menu-item-class'>
          <a
            className='custom-anchor-class'
            style={{color: 'red'}}
            download='filename'
            type='audio/vorbis'
            rel='nofollow'>
            Title
          </a>
        </MenuItem>
      );

      let node = React.findDOMNode(instance);
      assert(node.className.match(/\bmenu-item-class\b/));
      assert.equal(node.getAttribute('href'), null);
      assert.equal(node.getAttribute('title'), null);

      let anchorNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
      // custom properties
      assert(anchorNode.className.match(/\bcustom-anchor-class\b/));
      assert.equal(anchorNode.getAttribute('download'), 'filename');
      assert.equal(anchorNode.getAttribute('rel'), 'nofollow');
      assert.equal(anchorNode.getAttribute('type'), 'audio/vorbis');
      assert.equal(anchorNode.style.color, 'red');
      // pass through properties
      assert.equal(anchorNode.getAttribute('tabIndex'), '-1');
      assert.equal(anchorNode.getAttribute('href'), '/song.ogg');
      assert.equal(anchorNode.getAttribute('target'), '_blank');
      assert.equal(anchorNode.getAttribute('title'), 'title for menu item');
    });
  });
});
