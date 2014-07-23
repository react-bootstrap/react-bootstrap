/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup>
      <DropdownButton bsStyle="success" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <Button bsStyle="info">Middle</Button>
      <Button bsStyle="info">Right</Button>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);