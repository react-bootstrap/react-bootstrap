class NavDropdownExample extends React.Component {
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  render() {
    return (
      <Nav
        componentClass="div"
        variant="tabs"
        activeKey="1"
        onSelect={k => this.handleSelect(k)}
      >
        <Nav.Link eventKey="1" href="/home">
          NavLink 1 content
        </Nav.Link>
        <Nav.Link eventKey="2" title="Item">
          NavLink 2 content
        </Nav.Link>
        <Nav.Link eventKey="3" disabled>
          NavLink 3 content
        </Nav.Link>
        <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

render(<NavDropdownExample />);
