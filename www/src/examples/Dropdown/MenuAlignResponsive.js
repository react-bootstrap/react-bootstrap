<>
  <div>
    <DropdownButton
      as={ButtonGroup}
      menuAlign={{ sm: 'left', md: 'right', lg: 'left', xl: 'right' }}
      title="My Responsive Dropdown"
      id="dropdown-menu-align-responsive-1"
    >
      <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
      <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
    </DropdownButton>
  </div>
  <div className="mt-2">
    <SplitButton
      menuAlign={{ sm: 'left', md: 'right', lg: 'left', xl: 'right' }}
      title="My Responsive Dropdown"
      id="dropdown-menu-align-responsive-2"
    >
      <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
      <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
    </SplitButton>
  </div>
</>;
