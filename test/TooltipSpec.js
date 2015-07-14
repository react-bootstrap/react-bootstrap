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

  });

});
