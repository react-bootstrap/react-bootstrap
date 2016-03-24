import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Media from '../src/Media';

describe(`Media.Heading`, () => {
  it(`uses "h4" by default`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media.Heading/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });
  it(`has "media-heading" class`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media.Heading/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
  });
  it(`should merge additional classes passed in`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media.Heading className="custom-class" />
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media-heading');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });
  it(`should allow custom elements instead of "h4"`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Media.Heading componentClass='h2' />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H2');
  });
  it(`should render children`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media.Heading>
          <strong>Children</strong>
        </Media.Heading>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
