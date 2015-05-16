import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Tooltip from '../src/Tooltip';

describe('Tooltip', function () {
  it('Should output a tooltip with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tooltip>
        <strong>Tooltip Content</strong>
      </Tooltip>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'fade'));
  });

  it('Should not have the fade class if animation is false', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tooltip animation={false}>
        <strong>Tooltip Content</strong>
      </Tooltip>
    );
    assert.equal(instance.getDOMNode().className.match(/\bfade\b/), null, 'The fade class should not be present');
  });
});
