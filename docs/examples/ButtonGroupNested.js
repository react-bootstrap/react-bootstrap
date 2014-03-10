/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup>
      <Button bsStyle="default">1</Button>
      <Button bsStyle="default">2</Button>
      <DropdownButton bsStyle="default" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);