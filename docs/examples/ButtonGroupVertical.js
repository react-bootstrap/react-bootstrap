/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup bsVariation="vertical">
      <Button bsStyle="default">Button</Button>
      <Button bsStyle="default">Button</Button>
      <DropdownButton bsStyle="default" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <Button bsStyle="default">Button</Button>
      <Button bsStyle="default">Button</Button>
      <DropdownButton bsStyle="default" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
      <DropdownButton bsStyle="default" title="Dropdown">
        <MenuItem key="1">Dropdown link</MenuItem>
        <MenuItem key="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);