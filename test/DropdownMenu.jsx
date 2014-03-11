/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var DropdownMenu   = require('../cjs/DropdownMenu');
var MenuItem       = require('../cjs/MenuItem');

describe('DropdownMenu', function () {
  it('Should render menu correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
        <DropdownMenu>
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownMenu>
    );

    assert.equal(instance.getDOMNode().nodeName, 'UL');
    assert.ok(instance.getDOMNode().className.match(/\bdropdown-menu\b/));
  });

});