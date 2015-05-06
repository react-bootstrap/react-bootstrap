const buttonsInstance = (
  <div>
    <input placeholder='Before' type='text' />
    <DropdownButtonRevisited title='Revisited Dropdown'>
      <MenuItemRevisited eventKey='1'>Action</MenuItemRevisited>
      <MenuItemRevisited eventKey='2'>Another action</MenuItemRevisited>
      <MenuItemRevisited eventKey='3'>Something else here</MenuItemRevisited>
      <MenuItemRevisited divider />
      <MenuItemRevisited eventKey='4'>Separated link</MenuItemRevisited>
    </DropdownButtonRevisited>
    <input placeholder='After' type='text' />
  </div>
);

React.render(buttonsInstance, mountNode);
