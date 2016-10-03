const buttonGroupInstance = (
  <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
    <ToggleButton value={1}>
      Radio 1 (pre-checked)
    </ToggleButton>
    <ToggleButton value={2}>Radio 3</ToggleButton>

    <ToggleButton value={3}>Radio 3</ToggleButton>
  </ToggleButtonGroup>
);

ReactDOM.render(buttonGroupInstance, mountNode);
