define(
  ["./ReactPropTransferer","./keyMirror","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    "use strict";

    var ReactPropTransferer = __dependency1__["default"];

    var keyMirror = __dependency2__["default"];

    var SpecialPropsToTransfer = keyMirror({
      key: null,
      children: null,
      ref: null
    });

    /**
     * Sometimes you want to change the props of a child passed to you. Usually
     * this is to add a CSS class.
     *
     * @param {object} child child component you'd like to clone
     * @param {object} props props you'd like to modify. They will be merged
     * as if you used `transferPropsTo()`.
     * @return {object} a clone of child with props merged in.
     */
    function cloneWithProps(child, props) {
      var newProps = ReactPropTransferer.mergeProps(child.props, props);

      // ReactPropTransferer does not transfer the `key` prop so do it manually. Do
      // not transfer it from the original component.
      if (props.hasOwnProperty(SpecialPropsToTransfer.key)) {
        newProps.key = props.key;
      }

      // ReactPropTransferer does not transfer the `children` prop. Transfer it
      // from `props` if it exists, otherwise use `child.props.children` if it is
      // provided.
      if (props.hasOwnProperty(SpecialPropsToTransfer.children)) {
        newProps.children = props.children;
      } else if (child.props.hasOwnProperty(SpecialPropsToTransfer.children)) {
        newProps.children = child.props.children;
      }

      // ReactPropTransferer does not transfer `ref` so do it manually.
      if (props.hasOwnProperty(SpecialPropsToTransfer.ref)) {
        newProps.ref = props.ref;
      }

      return child.constructor.ConvenienceConstructor(newProps);
    }

    __exports__["default"] = cloneWithProps;
  });