const navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Brand</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <div className="form-group">
          <Input type="text" placeholder="Search"/>
        </div>
        {' '}
        <Button type="submit">Submit</Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

ReactDOM.render(navbarInstance, mountNode);
