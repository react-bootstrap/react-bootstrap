define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var ReactPropTransferer = require('react/lib/ReactPropTransferer');

    __exports__["default"] = {

      /**
       * Sometimes you want to change the props of a child passed to you. Usually
       * this is to add a CSS class.
       *
       * @param {object} child child component you'd like to clone
       * @param {object} props props you'd like to modify. They will be merged
       * as if you used `transferPropsTo()`.
       * @return {object} a clone of child with props merged in.
       */
      cloneWithProps: function (child, props) {
        return child.constructor.ConvenienceConstructor(
          ReactPropTransferer.mergeProps(child.props, props)
        );
      }
    };
  });