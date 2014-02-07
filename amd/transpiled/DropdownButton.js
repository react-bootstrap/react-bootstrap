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
          options: [],
          bsClass: 'button'
        }
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

      handleOptionSelect: function (i) {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(i);
        }
      },

      handleKeyUp: function (e) {
        if (e.keyCode === 27) {
          this.toggle(false);
        }
      },

      handleClickOutside: function (e) {
        this.toggle(false);
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

        var classObject = this.getBsClassSet();
        classObject['dropdown-toggle'] = true;
        var className = classSet(classObject);

        var title = this.props.isTitleHidden ?
          React.DOM.span( {className:"sr-only"}, this.props.title) : this.props.title;

        return (
          React.DOM.div( {className:groupClassName}, 
            Button(
              {id:this.props.id,
              ref:"button",
              className:className,
              onClick:this.handleClick}, 
              title,' ',React.DOM.span( {className:"caret"} )
            ),
            React.DOM.ul(
              {className:"dropdown-menu",
              role:"menu",
              ref:"menu",
              'aria-labelledby':this.props.id}, 
              utils.modifyChildren(this.props.children, this.renderMenuItem)
            )
          )
        );
      },

      renderMenuItem: function (child, i) {
        return utils.cloneWithProps(
            child,
            {
              onSelect: this.handleOptionSelect.bind(this, i)
            }
          );
      }
    });

    __exports__["default"] = DropdownButton;
  });