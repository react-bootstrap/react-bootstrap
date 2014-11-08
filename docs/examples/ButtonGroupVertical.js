var buttonGroupInstance = (
    <ButtonGroup vertical>
      <Button>Button</Button>
      <Button>Button</Button>
      <DropdownButton title="Dropdown">
        <MenuItem selectKey="1">Dropdown link</MenuItem>
        <MenuItem selectKey="2">Dropdown link</MenuItem>
      </DropdownButton>
      <Button>Button</Button>
      <Button>Button</Button>
      <DropdownButton title="Dropdown">
        <MenuItem selectKey="1">Dropdown link</MenuItem>
        <MenuItem selectKey="2">Dropdown link</MenuItem>
      </DropdownButton>
      <DropdownButton title="Dropdown">
        <MenuItem selectKey="1">Dropdown link</MenuItem>
        <MenuItem selectKey="2">Dropdown link</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  );

React.render(buttonGroupInstance, mountNode);