var Brand = (
    <a className="navbar-brand" href="#">Brand</a>
  );
var navbarInstance = (
    <Navbar brand={Brand}>
      <Nav>
        <Button>Log In</Button>
      </Nav>
    </Navbar>
  );

React.render(navbarInstance, mountNode);