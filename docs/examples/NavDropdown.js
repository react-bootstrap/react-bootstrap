function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navInstance = (
    <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
      <NavItem selectKey={1} href="/home">NavItem 1 content</NavItem>
      <NavItem selectKey={2} title="Item">NavItem 2 content</NavItem>
      <NavItem selectKey={3} disabled={true}>NavItem 3 content</NavItem>
      <DropdownButton selectKey={4} title="Dropdown" navItem={true}>
        <MenuItem selectKey="4.1">Action</MenuItem>
        <MenuItem selectKey="4.2">Another action</MenuItem>
        <MenuItem selectKey="4.3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem selectKey="4.4">Separated link</MenuItem>
      </DropdownButton>
    </Nav>
  );

React.render(navInstance, mountNode);
