"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var PanelGroup = require("./PanelGroup")["default"];

var Accordion = React.createClass({displayName: 'Accordion',

  render: function () {
    return this.transferPropsTo(
      PanelGroup( {isAccordion:true}, 
          this.props.children
      )
    );
  }

});

exports["default"] = Accordion;