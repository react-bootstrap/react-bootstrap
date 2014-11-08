var buttonsInstance = (
    <div>
      <ButtonToolbar>
        <DropdownButton bsSize="large" title="Large button">
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <DropdownButton bsSize="small" title="Small button">
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <DropdownButton bsSize="xsmall" title="Extra small button">
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );

React.render(buttonsInstance, mountNode);