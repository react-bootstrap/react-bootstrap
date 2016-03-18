import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import MediaBody from '../src/Media/MediaBody';

describe(`MediaBody`, () => {
  it(`uses "div"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaBody/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });
  it(`has "media-body" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaBody/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-body');
  });
  it(`should have inner heading with 'media-heading' class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaBody/>
      );

    const heading = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'h4');

    assert.include(heading.className, 'media-heading');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaBody className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media-body');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <MediaBody>
          <strong>Content</strong>
        </MediaBody>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
