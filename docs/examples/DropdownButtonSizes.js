const buttonsInstance = (
  <div>
    <ButtonToolbar>
      <DropdownButton bsSize='large' title='Large button'>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </DropdownButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <DropdownButton bsSize='small' title='Small button'>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </DropdownButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <DropdownButton bsSize='xsmall' title='Extra small button'>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </DropdownButton>
    </ButtonToolbar>
  </div>
);

React.render(buttonsInstance, mountNode);
