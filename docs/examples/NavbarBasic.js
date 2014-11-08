var navbarInstance = (
    <Navbar>
      <Nav>
        <NavItem selectKey={1} href="#">Link</NavItem>
        <NavItem selectKey={2} href="#">Link</NavItem>
        <DropdownButton selectKey={3} title="Dropdown">
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </DropdownButton>
      </Nav>
    </Navbar>
  );

React.render(navbarInstance, mountNode);