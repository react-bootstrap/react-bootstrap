
const dropdownInstance = (
  <ButtonToolbar>
    <Dropdown id="dropdown-custom-1">
      <Dropdown.Toggle>
        <Glyphicon glyph="star" />
        Pow! Zoom!
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>Active Item</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown id="dropdown-custom-2">
      <Button bsStyle="info">
        mix it up style-wise
      </Button>
      <Dropdown.Toggle bsStyle="success"/>
      <Dropdown.Menu className="super-colors">
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>Active Item</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
      </Dropdown.Menu>
    </Dropdown>

  </ButtonToolbar>
);

React.render(dropdownInstance, mountNode);
