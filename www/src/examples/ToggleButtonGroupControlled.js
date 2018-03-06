class ToggleButtonGroupControlled extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: [1, 3]
    };
  }

  handleChange(e) {
    this.setState({ value: e });
  }

  render() {
    return (
      <ToggleButtonGroup
        type="checkbox"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
        <ToggleButton value={2}>Checkbox 2</ToggleButton>
        <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
        <ToggleButton value={4} disabled>
          Checkbox 4 (disabled)
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

render(<ToggleButtonGroupControlled />);
