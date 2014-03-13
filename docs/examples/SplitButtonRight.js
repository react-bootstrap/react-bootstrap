/** @jsx React.DOM */

var buttonsInstance = (
    <SplitButton title="Dropdown right" pullRight>
      <MenuItem key="1">Action</MenuItem>
      <MenuItem key="2">Another action</MenuItem>
      <MenuItem key="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem key="4">Separated link</MenuItem>
    </SplitButton>
  );

React.renderComponent(buttonsInstance, mountNode);