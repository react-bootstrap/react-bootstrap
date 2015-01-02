/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonToolbar  = require('../lib/ButtonToolbar');
var ButtonGroup    = require('../lib/ButtonGroup');
var Button         = require('../lib/Button');

describe('ButtonToolbar', function () {
  it('Should output a button toolbar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>
            Title
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-toolbar\b/));
    assert.equal(instance.getDOMNode().getAttribute('role'), 'toolbar');
  });
});
