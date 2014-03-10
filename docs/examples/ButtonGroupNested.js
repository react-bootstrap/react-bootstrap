/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup>
      <Button>1</Button>
      <Button>2</Button>
      <DropdownButton title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);