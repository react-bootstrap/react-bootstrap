<>
  <ButtonToolbar>
    {[DropdownButton, SplitButton].map((DropdownType, idx) => (
      <DropdownType
        size="lg"
        title={` Drop large `}
        id={`dropdown-button-drop-${idx}`}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownType>
    ))}
  </ButtonToolbar>
  <ButtonToolbar>
    {[DropdownButton, SplitButton].map((DropdownType, idx) => (
      <DropdownType
        size="sm"
        variant="secondary"
        title={`Drop small`}
        id={`dropdown-button-drop-${idx}`}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownType>
    ))}
  </ButtonToolbar>
</>;
