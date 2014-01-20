/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react/addons');
var DropdownButton = require('../lib/DropdownButton');
var MenuItem       = require('../lib/MenuItem');

var ReactTestUtils;

describe('DropdownButton', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it('Should render correctly', function () {
    var instance = (
        <DropdownButton title="Title">
          <MenuItem>MenuItem 1 content</MenuItem>
          <MenuItem>MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

    ReactTestUtils.renderIntoDocument(instance);
  });
});