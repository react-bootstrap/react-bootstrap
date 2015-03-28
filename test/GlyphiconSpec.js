import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Glyphicon from '../src/Glyphicon';

describe('Glyphicon', function () {
  it('Should have correct class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph='star' />
    );
    assert.ok(instance.getDOMNode().className.match(/\bglyphicon\b/));
    assert.ok(instance.getDOMNode().className.match(/\bglyphicon-star\b/));
  });
});
