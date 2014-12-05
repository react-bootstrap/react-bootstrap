var ExampleInput = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },

  validationState: function() {
    var length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange: function() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render: function() {
    return (
        <Input
          type="text"
          value={this.state.value}
          placeholder="Enter text"
          label="Working example with validation"
          help="Validates based on string length."
          bsStyle={this.validationState()}
          hasFeedback
          ref="input"
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class"
          onChange={this.handleChange} />
    );
  }
});

React.render(<ExampleInput />, mountNode);
