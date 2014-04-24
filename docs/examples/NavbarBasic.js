/** @jsx React.DOM */

function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navbarInstance = (
    <Navbar brand="ENCODE" target="example-navbar">
      <Nav navbar={true} bsStyle="navbar-nav" activeKey={1} onSelect={handleSelect}>
        <NavItem key={1} href="/home">NavItem 1 content</NavItem>
        <NavItem key={2} title="Item" dropdown={true}>
          NavItem 2 content
          <Nav dropdown={true}>
            <NavItem key={1} href="/home">Drop 1</NavItem>
            <NavItem key={2} href="/home">Drop 2</NavItem>
            <NavItem key={3} href="/home">Drop 3</NavItem>
          </Nav>
        </NavItem>
        <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>
      </Nav>
    </Navbar>
  );

React.renderComponent(navbarInstance, mountNode);