/** @jsx React.DOM */

var BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger', 'Link'];

function renderDropdownButton(title) {
  return (
      <DropdownButton bsStyle={title.toLowerCase()} title={title}>
        <MenuItem key="1">Action</MenuItem>
        <MenuItem key="2">Another action</MenuItem>
        <MenuItem key="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem key="4">Separated link</MenuItem>
      </DropdownButton>
    );
}

var buttonsInstance = (
    <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );

React.renderComponent(buttonsInstance, mountNode);