import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe('Media.Right', () => {
  it('uses "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Right />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "media-right" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Media.Right />);

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-right\b/)
    );
  });

  it('should be able to change alignment to middle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Right align="middle" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-middle\b/)
    );
  });

  it('should be able to change alignment to bottom', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Right align="bottom" />
    );

    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bmedia-bottom\b/)
    );
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Right className="custom-class" />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-right');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Media.Right>
        <img />
      </Media.Right>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'img'));
  });
});
