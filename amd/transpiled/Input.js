define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var INPUT_TYPES = [
      'text',
      'password',
      'datetime',
      'datetime-local',
      'date',
      'month',
      'time',
      'week',
      'number',
      'email',
      'url',
      'search',
      'tel',
      'color'
    ];

    var Input = React.createClass({displayName: 'Input',
      propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(INPUT_TYPES).isRequired,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string,
        required: React.PropTypes.bool,
        oneOf: React.PropTypes.array
        //minLength: React.PropTypes.int
      },

      getValue: function () {
        return this.refs.input.getDOMNode().value;
      },

      renderInput: function () {
        var classes = {
          'form-control': true,
          'input-md': true
        };

        return (
          React.DOM.input(
            {id:this.props.id,
            type:this.props.type,
            className:classSet(classes),
            placeholder:this.props.placeholder,
            ref:"input"}
          )
        );
      },

      renderLabel: function () {
        return this.props.label ? React.DOM.label( {for:this.props.id}, this.props.label) : null;
      },

      render: function () {
        var classes = {
          'form-group': true,
          'has-error': !!this.state.error
        };

        return (
          React.DOM.div( {className:classSet(classes), onBlur:this.handleBlur, onFocus:this.handleFocus}, 
            this.renderInput(),
            this.renderLabel()
          )
        );
      },

      handleBlur: function (e) {
        var value = this.getValue();
        var error;

        if (this.props.required && !value) {
          error = 'required';
        } else if (this.props.oneOf && !(value in this.props.oneOf)) {
          error = 'oneOf';
        } else if (this.props.minLength && value.length < this.props.minLength) {
          error = 'minLength';
        }

        this.setState({
          error: error
        });
      },

      handleFocus: function(e) {
        this.setState({
          error: false
        });

        e.stopPropagation();
      }
    });

    __exports__["default"] = Input;
  });