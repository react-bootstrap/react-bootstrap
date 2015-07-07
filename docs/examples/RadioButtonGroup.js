const SimpleRadioGroup = React.createClass({
  getInitialState() {
    return {message: undefined};
  },

  handleChange(newValue) {
    this.setState({message: newValue});
  },

  render() {
    const message = this.state.message ?
      <FormControls.Static>{this.state.message}</FormControls.Static> :
      null;

    const handleChange = this.handleChange;

    return (
      <form>
        {message}
        <FormControls.RadioGroup name="greeting" inline legend="Greetings" srOnly>
          <FormControls.RadioButton value="Hi!">Hi!</FormControls.RadioButton>
          <FormControls.RadioButton value="Hello!">Hello!</FormControls.RadioButton>
        </FormControls.RadioGroup>
        <FormControls.RadioGroup name="farewell" onChange={handleChange}>
          <FormControls.RadioButton label="Bye!" value="Bye!" />
          <FormControls.RadioButton label="Goodbye!" value="Goodbye!" />
        </FormControls.RadioGroup>
        <FormControls.RadioGroup name="thing" defaultValue="2">
          <FormControls.RadioButton label="1" value="1" disabled />
          <FormControls.RadioButton label="2" value="2" disabled />
          <FormControls.RadioButton label="3" value="3" disabled />
        </FormControls.RadioGroup>
        <FormControls.RadioButton value="5" />
      </form>
    );
  }
});

React.render(<SimpleRadioGroup />, mountNode);
