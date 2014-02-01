define(
  ["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];

    var MenuItem = React.createClass({displayName: 'MenuItem',
      handleClick: function (e) {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(this.props.key);
        }
      },

      renderAnchor: function () {
        return (
          React.DOM.a( {onClick:this.handleClick, href:"#", tabIndex:"-1", ref:"anchor"}, 
            this.props.children
          )
        );
      },

      render: function () {
        var className = null;
        var children = null;

        if (this.props.bsVariation === 'header') {
          children = this.props.children;
          className = 'dropdown-header';
        } else if (this.props.bsVariation === 'divider') {
          className = 'divider';
        } else {
          children = this.renderAnchor();
        }

        return this.transferPropsTo(
          React.DOM.li( {role:"presentation", className:className}, 
            children
          )
        );
      }
    });

    __exports__["default"] = MenuItem;
  });