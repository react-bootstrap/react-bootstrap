function onSelectAlert(eventKey, href, target) {
  alert('Alert from menu item.\neventKey: "' + eventKey + '"\nhref: "' + href + '"');
}

function preventDefault() {}

const MenuItems = (
  <div className="clearfix">
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem onSelect={preventDefault}>link</MenuItem>
      <MenuItem divider/>
      <MenuItem header>Header</MenuItem>
      <MenuItem onSelect={preventDefault}>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title." onSelect={preventDefault}>
        link with title
      </MenuItem>
      <MenuItem eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </MenuItem>
    </ul>
  </div>
);

React.render(MenuItems, mountNode);
