/*global describe, beforeEach, afterEach, it, assert */

var React = require('react/addons');
var SplitButton = require('../lib/SplitButton');

var ReactTestUtils;

describe('SplitButton', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it('Should throw if missing title', function (done) {
    try {
      var instance = SplitButton({});
      ReactTestUtils.renderIntoDocument(instance);
    } catch (e) {
      assert(e);
      done();
    }
  });

  it('Should throw with bad variation', function (done) {
    try {
      var instance = SplitButton({
        title: 'button',
        bsVariation: 'invalid'
      });
      ReactTestUtils.renderIntoDocument(instance);
    } catch (e) {
      assert(e);
      done();
    }
  });

});