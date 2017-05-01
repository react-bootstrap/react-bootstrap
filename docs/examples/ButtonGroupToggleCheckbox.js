const toggleButtonGroup = (
  <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
    <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
    <ToggleButton value={2}>Checkbox 3</ToggleButton>

    <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
  </ToggleButtonGroup>
);

ReactDOM.render(toggleButtonGroup, mountNode);
