<div>
  <ButtonToolbar>
    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
      <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
      <ToggleButton value={2}>Checkbox 2</ToggleButton>
      <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>

  <ButtonToolbar>
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
      <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
      <ToggleButton value={2}>Radio 2</ToggleButton>
      <ToggleButton value={3}>Radio 3</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
</div>;
