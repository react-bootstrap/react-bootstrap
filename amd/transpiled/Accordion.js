define(
  ["./react-es6","./PanelGroup","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var PanelGroup = __dependency2__["default"];

    var Accordion = React.createClass({displayName: 'Accordion',

      render: function () {
        return this.transferPropsTo(
          PanelGroup( {isAccordion:true}, 
              this.props.children
          )
        );
      }

    });

    __exports__["default"] = Accordion;
  });