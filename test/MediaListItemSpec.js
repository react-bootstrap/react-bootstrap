import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import MediaListItem from '../src/Media/MediaListItem';

describe(`MediaListItem`, () => {
  it(`uses "li"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'LI');
  });
  it(`has "media" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaListItem>
          <strong>Content</strong>
        </MediaListItem>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
