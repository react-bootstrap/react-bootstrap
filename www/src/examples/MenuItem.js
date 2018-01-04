function onSelectAlert(eventKey) {
  alert(`Alert from menu item.\neventKey: ${eventKey}`);
}

const MenuItems = (
  <Clearfix>
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem divider />
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title.">link with title</MenuItem>
      <MenuItem eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </MenuItem>
    </ul>
  </Clearfix>
);

render(MenuItems);
