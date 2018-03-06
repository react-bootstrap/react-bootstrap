function handleSelect(selectedKey) {
  alert(`selected ${selectedKey}`);
}

const navInstance = (
  <Nav
    activeKey={1}
    bsStyle="pills"
    className="flex-column"
    onSelect={handleSelect}
  >
    <NavItem eventKey={1} href="/home">
      NavItem 1 content
    </NavItem>
    <NavItem eventKey={2} title="Item">
      NavItem 2 content
    </NavItem>
    <NavItem eventKey={3} disabled>
      NavItem 3 content
    </NavItem>
  </Nav>
);

render(navInstance);
