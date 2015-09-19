import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Thumbnail from '../src/Thumbnail';

describe('Thumbnail', () => {
  it('Should have a thumbnail class and be an anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test" />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bthumbnail\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should have an image', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test" />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });

  it('Should have a thumbnail class and be a div', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail src="#" alt="test" />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bthumbnail\b/));
    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
  });

  it('Should have an image', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail src="#" alt="test" />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });

  it('Should have an inner div with class caption', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail src="#" alt="test">
        Test
        <div>
          Test child element
        </div>
      </Thumbnail>
    );
    assert.ok(React.findDOMNode(instance).lastChild.className.match(/\bcaption\b/));
  });
});
