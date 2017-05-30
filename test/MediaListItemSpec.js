import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Media from '../src/Media';

describe(`Media.ListItem`, () => {
  it(`uses "li"`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <Media.ListItem/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'LI');
  });
  it(`has "media" class`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <Media.ListItem/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
  });
  it(`should merge additional classes passed in`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <Media.ListItem className="custom-class" />
      );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'media');
    assert.include(classes, 'custom-class');
  });
  it(`should render children`, () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <Media.ListItem>
          <strong>Content</strong>
        </Media.ListItem>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
