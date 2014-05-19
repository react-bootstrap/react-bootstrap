/** @jsx React.DOM */

function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navbarInstance = (
    <Navbar brand="ENCODE" brandlink="/"  target="example-navbar">
      <Nav navbar={true} bsStyle="navbar-nav" activeKey={1} onSelect={handleSelect}>
        <NavItem key={1} href="/home">NavItem 1</NavItem>
        <NavItem key={2} title="Item" dropdown={true}>
          NavItem 2
          <Nav dropdown={true}>
            <NavItem key={1} href="/home" data-target="login">Drop 1</NavItem>
            <NavItem key={2} href="/home">Drop 2</NavItem>
            <NavItem key={3} href="/home">Drop 3</NavItem>
          </Nav>
        </NavItem>
        <NavItem key={3} disabled={true}>NavItem 3</NavItem>
      </Nav>
      <Form navbar={true} role="search" align="right">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <Button bsStyle="default">Search</Button>
      </Form>
    </Navbar>
  );

React.renderComponent(navbarInstance, mountNode);