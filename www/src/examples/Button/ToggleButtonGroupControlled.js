function ToggleButtonGroupControlled() {
  const [value, setValue] = useState([1, 3]);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  const handleChange = val => setValue(val);

  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton value={1}>Option 1</ToggleButton>
      <ToggleButton value={2}>Option 2</ToggleButton>
      <ToggleButton value={3}>Option 3</ToggleButton>
    </ToggleButtonGroup>
  );
}

render(<ToggleButtonGroupControlled />);
