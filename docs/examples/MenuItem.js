function onSelectAlert(eventKey, href) {
  alert('Alert from menu item.\neventKey: "' + eventKey + '"\nhref: "' + href + '"');
}

const MenuItems = (
  <div className="clearfix">
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem divider/>
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title.">
        link with title
      </MenuItem>
      <MenuItem eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </MenuItem>
    </ul>
  </div>
);

React.render(MenuItems, mountNode);
