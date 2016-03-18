import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import MediaRight from '../src/Media/MediaRight';

describe(`MediaRight`, () => {
  it(`uses "div"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });
  it(`has "media-right" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight/>
      );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-right\b/));
  });
  it(`should have align='top' by default`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight/>
      );

    assert.equal(instance.props.align, 'top');
  });
  it(`has "media-top" class by default`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight/>
      );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-top\b/));
  });
  it(`should be able to change alignment class to media-middle`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight align='middle'/>
      );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-middle\b/));
  });
  it(`should be able to change alignment class to media-bottom`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight align='bottom'/>
      );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-bottom\b/));
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight className="my-custom-class" />
      );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-right\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmedia-top\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bmy-custom-class\b/));
  });
  it(`should have href='#' by default`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight />
      );

    assert.equal(instance.props.href, '#');
  });
  it(`should apply 'href' to inner anchor element`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight href='http://test.com/'/>
      );
    const link = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');

    assert.equal(link.href, 'http://test.com/');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaRight>
          <img/>
        </MediaRight>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });
});
