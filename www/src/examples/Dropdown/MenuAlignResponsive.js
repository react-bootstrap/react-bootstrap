<>
  <div>
    <DropdownButton
      as={ButtonGroup}
      menuAlign={{ lg: 'right' }}
      title="Left-aligned but right aligned when large screen"
      id="dropdown-menu-align-responsive-1"
    >
      <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
      <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
    </DropdownButton>
  </div>
  <div className="mt-2">
    <SplitButton
      menuAlign={{ lg: 'left' }}
      title="Right-aligned but left aligned when large screen"
      id="dropdown-menu-align-responsive-2"
    >
      <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
      <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
    </SplitButton>
  </div>
</>;
