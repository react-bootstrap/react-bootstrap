<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link eventKey={1} href="#">
        Link
      </Nav.Link>
      <Nav.Link eventKey={2} href="#">
        Link
      </Nav.Link>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link eventKey={1} href="#">
        Link Right
      </Nav.Link>
      <Nav.Link eventKey={2} href="#">
        Link Right
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>;
