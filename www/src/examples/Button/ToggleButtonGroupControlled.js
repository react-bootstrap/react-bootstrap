class ToggleButtonGroupControlled extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: [1, 3],
    };
  }

  handleChange(value, event) {
    this.setState({ value });
  }

  render() {
    return (
      <ToggleButtonGroup
        type="checkbox"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <ToggleButton value={1}>Option 1</ToggleButton>
        <ToggleButton value={2}>Option 2</ToggleButton>
        <ToggleButton value={3}>Option 3</ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

render(<ToggleButtonGroupControlled />);
