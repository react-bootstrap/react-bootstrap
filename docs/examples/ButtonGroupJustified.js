/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup bsVariation="justified">
      <Button href="#" bsStyle="default">Left</Button>
      <Button href="#" bsStyle="default">Middle</Button>
      <DropdownButton href="#" bsStyle="default" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);