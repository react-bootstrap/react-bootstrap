const navbarInstance = (
  <Navbar brand='React-Bootstrap' toggleNavKey={0}>
    <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
      <Nav navbar>
        <NavItem eventKey={1} href='#'>Link</NavItem>
        <NavItem eventKey={2} href='#'>Link</NavItem>
        <DropdownButton eventKey={3} title='Dropdown'>
          <MenuItem eventKey='1'>Action</MenuItem>
          <MenuItem eventKey='2'>Another action</MenuItem>
          <MenuItem eventKey='3'>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey='4'>Separated link</MenuItem>
        </DropdownButton>
      </Nav>
      <Nav navbar right>
        <NavItem eventKey={1} href='#'>Link Right</NavItem>
        <NavItem eventKey={2} href='#'>Link Right</NavItem>
      </Nav>
    </CollapsibleNav>
  </Navbar>
);

React.render(navbarInstance, mountNode);
