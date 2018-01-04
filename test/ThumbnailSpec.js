import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Thumbnail from '../src/Thumbnail';

describe('<Thumbnail>', () => {
  it('Should have a thumbnail class and be an anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bthumbnail\b/));
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
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bthumbnail\b/));
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
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
        <div>Test child element</div>
      </Thumbnail>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).lastChild.className.match(/\bcaption\b/)
    );
  });

  it('Should have an inner div with class caption in an anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test">
        Test
        <div>Test child element</div>
      </Thumbnail>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).lastChild.className.match(/\bcaption\b/)
    );
  });

  it('Should have an img with an onError callback', () => {
    const onErrorSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test" onError={onErrorSpy} />
    );
    const img = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img');
    ReactTestUtils.Simulate.error(img);
    expect(onErrorSpy).to.have.been.calledOnce;
  });

  it('Should have an img with an onLoad callback', () => {
    const onLoadSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Thumbnail href="#" src="#" alt="test" onLoad={onLoadSpy} />
    );
    const img = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img');
    ReactTestUtils.Simulate.load(img);
    expect(onLoadSpy).to.have.been.calledOnce;
  });
});
