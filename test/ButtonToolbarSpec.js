import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ButtonToolbar from '../src/ButtonToolbar';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

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
    let node = React.findDOMNode(instance);
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.className.match(/\bbtn-toolbar\b/));
    assert.equal(node.getAttribute('role'), 'toolbar');
  });
});
