const handleSelect = (event, selectEvent) => {
  console.log(`SELECTED ${selectEvent.eventKey}`);
};

class CustomMenu extends React.Component {
  render() {
    return (
      <ul className='dropdown-menu' style={{backgroundColor: 'red'}}>
        {this.props.children}
      </ul>
    );
  }
}

const buttonsInstance = (
  <div>
    <input placeholder='Before' type='text' />
    <DropdownButtonRevisited onSelect={handleSelect}>
      <DropdownButtonRevisited.Toggle>Custom Title</DropdownButtonRevisited.Toggle>
      <MenuItemRevisited eventKey='1'>Action</MenuItemRevisited>
      <MenuItemRevisited header>Some Header</MenuItemRevisited>
      <MenuItemRevisited eventKey='2'>Another action</MenuItemRevisited>
      <MenuItemRevisited eventKey='3'>Something else here</MenuItemRevisited>
      <MenuItemRevisited divider />
      <MenuItemRevisited eventKey='4'>Separated link</MenuItemRevisited>
    </DropdownButtonRevisited>
    <input placeholder='After' type='text' />
    <DropdownButtonRevisited>
      <DropdownButtonRevisited.Toggle>Custom Title</DropdownButtonRevisited.Toggle>
      <CustomMenu>
        <div>hello</div>
      </CustomMenu>
    </DropdownButtonRevisited>
  </div>
);

React.render(buttonsInstance, mountNode);
