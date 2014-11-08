var BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title) {
  return (
      <SplitButton bsStyle={title.toLowerCase()} title={title}>
        <MenuItem selectKey="1">Action</MenuItem>
        <MenuItem selectKey="2">Another action</MenuItem>
        <MenuItem selectKey="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem selectKey="4">Separated link</MenuItem>
      </SplitButton>
    );
}

var buttonsInstance = (
    <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );

React.render(buttonsInstance, mountNode);