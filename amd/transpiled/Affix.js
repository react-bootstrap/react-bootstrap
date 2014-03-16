define(
  ["./react-es6","./AffixMixin","./domUtils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var AffixMixin = __dependency2__["default"];
    var domUtils = __dependency3__["default"];

    var Affix = React.createClass({displayName: 'Affix',
      statics: {
        domUtils: domUtils
      },

      mixins: [AffixMixin],

      render: function () {
        return this.transferPropsTo(
          React.DOM.div( {className:this.state.affixClass, style:{top: this.state.affixPositionTop}}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Affix;
  });