/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var DropdownButton = require('../lib/DropdownButton');
var MenuItem       = require('../lib/MenuItem');

describe('DropdownButton', function () {
  it('Should render correctly', function () {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem key="1">MenuItem 1 content</MenuItem>
          <MenuItem key="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);
  });
});