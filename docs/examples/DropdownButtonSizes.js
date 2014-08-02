/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      <ButtonToolbar>
        <DropdownButton bsSize="large" title="Large button">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <DropdownButton bsSize="small" title="Small button">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <DropdownButton bsSize="xsmall" title="Extra small button">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);