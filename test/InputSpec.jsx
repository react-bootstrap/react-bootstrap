/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var Input      = require('../cjs/Input');

describe('Input', function () {
  it('Should render', function () {
    var instance = ReactTestUtils.renderIntoDocument(Input({name: 'name', type: 'text'}));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance, Input));
  });
});