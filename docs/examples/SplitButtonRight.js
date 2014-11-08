var buttonsInstance = (
    <SplitButton title="Dropdown right" pullRight>
      <MenuItem selectKey="1">Action</MenuItem>
      <MenuItem selectKey="2">Another action</MenuItem>
      <MenuItem selectKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem selectKey="4">Separated link</MenuItem>
    </SplitButton>
  );

React.render(buttonsInstance, mountNode);