const ButtonInputExample = React.createClass({
  getInitialState() {
    return {
      disabled: true,
      style: null
    };
  },

  resetValidation() {
    this.setState({
      disabled: true,
      style: null
    });
  },

  validationState() {
    let length = this.refs.input.getValue().length;
    let style = 'danger';

    if (length > 10) style = 'success';
    else if (length > 5) style = 'warning';

    let disabled = style !== 'success';

    return { style, disabled };
  },

  handleChange() {
    this.setState( this.validationState() );
  },

  render() {
    return (
    <form>
      <Input type="text" ref="input" onChange={this.handleChange} />
      <ButtonInput bsSize="small">Child Text</ButtonInput>
      <ButtonInput type="reset" bsStyle="primary" onClick={this.resetValidation} />
      <ButtonInput type="submit" value="Submit Your Input" bsStyle={this.state.style} bsSize="large" disabled={this.state.disabled} />
    </form>
    );
  }
});

React.render(<ButtonInputExample />, mountNode);
