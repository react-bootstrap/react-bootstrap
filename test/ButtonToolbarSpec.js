import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Button from '../src/Button';
import ButtonGroup from '../src/ButtonGroup';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>
            Title
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    let node = ReactDOM.findDOMNode(instance);
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.className.match(/\bbtn-toolbar\b/));
    assert.equal(node.getAttribute('role'), 'toolbar');
  });
});
