define(
  ["./react-es6","./react-es6/lib/cx","./Button","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var Button = __dependency3__["default"];
    var BootstrapMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];


    var DropdownButton = React.createClass({displayName: 'DropdownButton',
      mixins: [BootstrapMixin],

      getInitialState: function () {
        return {
          open: false
        };
      },

      getDefaultProps: function () {
        return {
          options: []
        };
      },

      toggle: function (open) {
        var newState = (open === undefined) ?
              !this.state.open : open;

        if (newState) {
          this.bindCloseHandlers();
        } else {
          this.unbindCloseHandlers();
        }

        this.setState({
          open: newState
        });
      },

      handleClick: function (e) {
        this.toggle();
      },

      handleOptionSelect: function (key) {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(key);
        }

        this.toggle(false);
      },

      handleKeyUp: function (e) {
        if (e.keyCode === 27) {
          this.toggle(false);
        }
      },

      handleClickOutside: function (e) {
        if (!this._clickedInside) {
          this.toggle(false);
        }
        delete this._clickedInside;
      },

      killClick: function (e) {
        // e.stopPropagation() doesn't prevent `handleClickOutside` from being called
        this._clickedInside = true;
      },

      bindCloseHandlers: function () {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keyup', this.handleKeyUp);
      },

      unbindCloseHandlers: function () {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keyup', this.handleKeyUp);
      },

      componentWillUnmount: function () {
        this.unbindCloseHandlers();
      },

      render: function () {
        var groupClassName = classSet({
            'btn-group': true,
            'open': this.state.open
          });

        var button = this.transferPropsTo(
            Button(
              {ref:"button",
              className:"dropdown-toggle",
              onClick:this.handleClick}, 
              this.props.title + ' ',React.DOM.span( {className:"caret"} )
            )
        );

        return (
          React.DOM.div( {className:groupClassName}, 
            button,
            React.DOM.ul(
              {className:"dropdown-menu",
              role:"menu",
              ref:"menu",
              'aria-labelledby':this.props.id,
              onClick:this.killClick}, 
              utils.modifyChildren(this.props.children, this.renderMenuItem)
            )
          )
        );
      },

      renderMenuItem: function (child, i) {
        return utils.cloneWithProps(
            child,
            {
              ref: child.props.ref || 'menuItem' + (i + 1),
              key: child.props.key,
              onSelect: this.handleOptionSelect.bind(this, child.props.key)
            }
          );
      }
    });

    __exports__["default"] = DropdownButton;
  });