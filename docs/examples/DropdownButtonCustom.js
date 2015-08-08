
const dropdownInstance = (
  <ButtonToolbar>
    <DropdownButton id='dropdown-custom-1'>
      <DropdownButton.Toggle>
        <Glyphicon glyph='star' />
        Pow! Zoom!
      </DropdownButton.Toggle>
      <DropdownButton.Menu className='super-colors'>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3' active>Active Item</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </DropdownButton.Menu>
    </DropdownButton>

    <SplitButton id='dropdown-custom-2'>
      <SplitButton.Button>
        <Glyphicon glyph='star' />
        Wow!
      </SplitButton.Button>
      <SplitButton.Toggle className='super-colors'/>
      <SplitButton.Menu>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
      </SplitButton.Menu>
    </SplitButton>
  </ButtonToolbar>
);

React.render(dropdownInstance, mountNode);
