<ButtonToolbar>
  {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
    variant => (
      <SplitButton
        title={variant}
        variant={variant.toLowerCase()}
        id={`dropdown-split-variants-${variant}`}
        key={variant}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </SplitButton>
    ),
  )}
</ButtonToolbar>;
