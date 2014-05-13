/** @jsx React.DOM */

var navbarInstance = (
    <Navbar>
      <Nav>
        <NavItem key={1} href="#">Link</NavItem>
        <NavItem key={2} href="#">Link</NavItem>
        <DropdownButton key={3} title="Dropdown">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </Nav>
    </Navbar>
  );

React.renderComponent(navbarInstance, mountNode);