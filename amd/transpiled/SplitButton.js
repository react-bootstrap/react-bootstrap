define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./Button","./DropdownButton","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var Button = __dependency4__["default"];
    var DropdownButton = __dependency5__["default"];

    var SplitButton = React.createClass({displayName: 'SplitButton',
      mixins: [BootstrapMixin],

      propTypes: {
        // TODO: Uncompatable with React 0.8.0
        //title: React.PropTypes.renderable.isRequired,
        //dropdownTitle: React.PropTypes.renderable,
        bsVariation: React.PropTypes.oneOf(['dropup']),
        isInInputGroup: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onOptionClick: React.PropTypes.func,
        options: React.PropTypes.array
      },

      getDefaultProps: function () {
        return {
          dropdownTitle: 'Toggle dropdown'
        };
      },

      handleClick: function () {
        if (typeof this.props.onClick === 'function') {
          this.props.onClick();
        }
      },

      handleOptionClick: function (key) {
        if (typeof this.props.onOptionClick === 'function') {
          this.props.onOptionClick(key);
        }
      },

      render: function () {
        var classes = {};

        classes[this.state.className] = true;
        classes['btn-group'] = !this.props.isInInputGroup;
        classes['input-group-btn'] = this.props.isInInputGroup;

        if (this.props.bsVariation) {
          classes[this.props.bsVariation] = true;
        }

        return (
          React.DOM.div( {className:classSet(classes)}, 
            this.transferPropsTo(Button( {onClick:this.handleClick}, this.props.title)),
            this.transferPropsTo(
              DropdownButton(
                {title:this.props.dropdownTitle,
                isTitleHidden:true,
                onClick:this.handleOptionClick,
                options:this.props.options}
              )
            )
          )
        );
      }
    });

    __exports__["default"] = SplitButton;
  });