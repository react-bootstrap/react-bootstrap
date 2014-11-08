var buttonGroupInstance = (
    <ButtonGroup justified>
      <Button href="#">Left</Button>
      <Button href="#">Middle</Button>
      <DropdownButton title="Dropdown">
        <MenuItem selectKey="1">Dropdown link</MenuItem>
        <MenuItem selectKey="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.render(buttonGroupInstance, mountNode);