
const dropdownInstance = (
  <div>
    <DropdownButton bsSize="large" title="Large button" id="dropdown-size-large-block" block vertical>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>

    <ButtonToolbar>
      <Dropdown id="dropdown-custom-3" block vertical>
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
    </ButtonToolbar>

  </div>

);

ReactDOM.render(dropdownInstance, mountNode);
