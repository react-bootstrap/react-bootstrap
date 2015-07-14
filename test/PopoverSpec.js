import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Popover from '../src/Popover';

describe('Popover', function () {
  it('Should output a popover title and content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Popover title="Popover title">
        <strong>Popover Content</strong>
      </Popover>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'popover-title'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'popover-content'));

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

});
