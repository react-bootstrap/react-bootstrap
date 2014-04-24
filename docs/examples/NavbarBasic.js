/** @jsx React.DOM */

function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navbarInstance = (
    <Navbar brand="ENCODE" target="example-navbar">
      <Nav navbar={true} bsStyle="navbar-nav" activeKey={1} onSelect={handleSelect}>
        <NavItem key={1} href="/home">NavItem 1 content</NavItem>
        <NavItem key={2} title="Item">NavItem 2 content</NavItem>
        <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>
      </Nav>
    </Navbar>
  );

React.renderComponent(navbarInstance, mountNode);