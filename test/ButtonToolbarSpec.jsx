/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonToolbar  = require('../cjs/ButtonToolbar');
var ButtonGroup    = require('../cjs/ButtonGroup');
var Button         = require('../cjs/Button');

describe('ButtonToolbar', function () {
  it('Should output a button toolbar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
            ButtonToolbar(null, ButtonGroup(null, Button(null, 'Title')))
        );
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-toolbar\b/));
    assert.equal(instance.getDOMNode().getAttribute('role'), 'toolbar');
  });
});