const navbarInstance = (
  <Navbar toggleNavKey={0}>
    <NavBrand>React-Bootstrap</NavBrand>
    <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
      <Nav navbar>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="collapsible-nav-dropdown">
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav navbar right>
        <NavItem eventKey={1} href="#">Link Right</NavItem>
        <NavItem eventKey={2} href="#">Link Right</NavItem>
      </Nav>
    </CollapsibleNav>
  </Navbar>
);

React.render(navbarInstance, mountNode);
