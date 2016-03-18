import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import MediaList from '../src/Media/MediaList';

describe(`MediaList`, () => {
  it(`uses "ul"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'UL');
  });
  it(`has "media-list" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-list');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-list');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaList>
          <strong>Content</strong>
        </MediaList>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
