<>
  <InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="outline-secondary"
      title="Dropdown"
    >
      <MenuItem href="#">Action</MenuItem>
      <MenuItem href="#">Another action</MenuItem>
      <MenuItem href="#">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem href="#">Separated link</MenuItem>
    </DropdownButton>
    <FormControl aria-describedby="basic-addon1" />
  </InputGroup>

  <InputGroup>
    <FormControl
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />

    <DropdownButton
      as={InputGroup.Append}
      variant="outline-secondary"
      title="Dropdown"
    >
      <MenuItem href="#">Action</MenuItem>
      <MenuItem href="#">Another action</MenuItem>
      <MenuItem href="#">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem href="#">Separated link</MenuItem>
    </DropdownButton>
  </InputGroup>
</>;
