function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navInstance = (
    <div>
      <Nav bsStyle="tabs" justified activeKey={1} onSelect={handleSelect}>
        <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
        <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
        <NavItem eventKey={3} disabled={true}>NavItem 3 content</NavItem>
      </Nav>
      <br />
      <Nav bsStyle="pills" justified activeKey={1} onSelect={handleSelect}>
        <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
        <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
        <NavItem eventKey={3} disabled={true}>NavItem 3 content</NavItem>
      </Nav>
    </div>
  );

React.render(navInstance, mountNode);
