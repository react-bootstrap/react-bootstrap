import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Thumbnail from '../src/Thumbnail';

describe('<Thumbnail>', () => {
  let defaultProps = {
    href: '#',
    src: '#',
    alt: 'test',
    onError: () => {},
    onLoad: () => {}
  }
  it('Should have a thumbnail class and be an anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...defaultProps} />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bthumbnail\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should have an image', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...defaultProps} />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });

  it('Should have a thumbnail class and be a div', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail src="#" alt="test" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bthumbnail\b/));
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('Should have an image', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...defaultProps} />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });

  it('Should have an inner div with class caption', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...defaultProps} >
        Test
        <div>
          Test child element
        </div>
      </Thumbnail>
    );
    assert.ok(ReactDOM.findDOMNode(instance).lastChild.className.match(/\bcaption\b/));
  });

  it('Should have an inner div with class caption in an anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...defaultProps}>
        Test
        <div>
          Test child element
        </div>
      </Thumbnail>
    );
    assert.ok(ReactDOM.findDOMNode(instance).lastChild.className.match(/\bcaption\b/));
  });

  it('Should have an img with an onError callback', () => {
    const onErrorSpy = sinon.spy();
    const {onError, ...otherKeys} = defaultProps;
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...otherKeys} onError={onErrorSpy} />
    );
    let img = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img');
    ReactTestUtils.Simulate.error(img)
    assert.ok(onErrorSpy.calledOnce);
  });

  it('Should have an img with an onLoad callback', () => {
    const onLoadSpy = sinon.spy();
    const {onLoad, ...otherKeys} = defaultProps;
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail {...otherKeys} onLoad={onLoadSpy} />
    );
    let img = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img');
    ReactTestUtils.Simulate.load(img)
    assert.ok(onLoadSpy.calledOnce);
  });

});
