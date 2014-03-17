/** @jsx React.DOM */

var BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title) {
  return (
      <SplitButton bsStyle={title.toLowerCase()} title={title}>
        <MenuItem key="1">Action</MenuItem>
        <MenuItem key="2">Another action</MenuItem>
        <MenuItem key="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem key="4">Separated link</MenuItem>
      </SplitButton>
    );
}

var buttonsInstance = (
    <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );

React.renderComponent(buttonsInstance, mountNode);