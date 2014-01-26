/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var SplitButton    = require('../cjs/SplitButton');

describe('SplitButton', function () {
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