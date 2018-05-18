<>
  <ButtonToolbar>
    {['up', 'down', 'left', 'right'].map(direction => (
      <DropdownButton
        drop={direction}
        variant="secondary"
        title={` Drop ${direction} `}
        id={`dropdown-button-drop-${direction}`}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    ))}
  </ButtonToolbar>

  <ButtonToolbar>
    {['up', 'down', 'left', 'right'].map(direction => (
      <SplitButton
        drop={direction}
        variant="secondary"
        title={`Drop ${direction}`}
        id={`dropdown-button-drop-${direction}`}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </SplitButton>
    ))}
  </ButtonToolbar>
</>;
