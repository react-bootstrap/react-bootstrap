const buttonGroupInstance = (
  <ButtonGroup justified>
    <Button href="#">Left</Button>
    <Button href="#">Middle</Button>
    <DropdownButton title="Dropdown" id="bg-justified-dropdown">
      <MenuItem eventKey="1">Dropdown link</MenuItem>
      <MenuItem eventKey="2">Dropdown link</MenuItem>
    </DropdownButton>
  </ButtonGroup>
);

React.render(buttonGroupInstance, mountNode);
