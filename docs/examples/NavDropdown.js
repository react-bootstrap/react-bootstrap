/** @jsx React.DOM */

function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
}

var navInstance = (
    <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
      <NavItem key={1} href="/home">NavItem 1 content</NavItem>
      <NavItem key={2} title="Item">NavItem 2 content</NavItem>
      <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>
      <DropdownButton key={4} title="Dropdown" navItem={true}>
        <MenuItem key="4.1">Action</MenuItem>
        <MenuItem key="4.2">Another action</MenuItem>
        <MenuItem key="4.3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem key="4.4">Separated link</MenuItem>
      </DropdownButton>
    </Nav>
  );

React.renderComponent(navInstance, mountNode);
