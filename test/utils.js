var createChainedFunction = require('../cjs/utils/createChainedFunction');

module.exports = {
  // Should be replaced
  // with `ReactTestUtils#nextUpdate()` when it is merged.
  // @see https://github.com/facebook/react/pull/948
  nextUpdate: function (component, callback) {
    var oldFn = component.componentDidUpdate;
    var newFn;

    function wrappedCallback(cb) {
      return function() {
        cb.apply(this, arguments);
        this.componentDidUpdate = oldFn;
      };
    }

    if (oldFn) {
      newFn = wrappedCallback(createChainedFunction(oldFn, callback));
    } else {
      newFn = wrappedCallback(callback);
    }

    component.componentDidUpdate = newFn;
  }
}