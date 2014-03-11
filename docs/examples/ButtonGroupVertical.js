/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup vertical>
      <Button>Button</Button>
      <Button>Button</Button>
      <DropdownButton title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <Button>Button</Button>
      <Button>Button</Button>
      <DropdownButton title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <DropdownButton title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);