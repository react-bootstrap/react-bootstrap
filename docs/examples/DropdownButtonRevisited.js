const buttonsInstance = (
  <div>
    <input placeholder='Before' type='text' />
    <DropdownButtonRevisited title='Revisited Dropdown'>
      <MenuItem eventKey='1'>Action</MenuItem>
      <MenuItem eventKey='2'>Another action</MenuItem>
      <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
      <MenuItem eventKey='4'>Separated link</MenuItem>
    </DropdownButtonRevisited>
    <input placeholder='After' type='text' />
  </div>
);

React.render(buttonsInstance, mountNode);
