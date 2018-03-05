<ButtonToolbar>
  {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
    variant => (
      <DropdownButton
        title={variant}
        variant={variant.toLowerCase()}
        id={`dropdown-variants-${variant}`}
        key={variant}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    )
  )}
</ButtonToolbar>;
