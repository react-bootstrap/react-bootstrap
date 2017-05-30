import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Popover id="test-popover" title="Popover title">
        <strong>Popover Content</strong>
      </Popover>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'popover-title'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'popover-content'));

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));

    assert.equal(ReactDOM.findDOMNode(instance).style.display, 'block');
  });
});
