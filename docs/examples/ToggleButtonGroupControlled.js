class ToggleButtonGroupControlled extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: [1, 3],
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <ToggleButtonGroup
        type="checkbox"
        value={this.state.value}
        onChange={this.onChange}
      >
        <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
        <ToggleButton value={2}>Checkbox 2</ToggleButton>

        <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
        <ToggleButton value={4} disabled>Checkbox 4 (disabled)</ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

ReactDOM.render(<ToggleButtonGroupControlled />, mountNode);
