<>
  <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
    <ButtonGroup className="me-2" aria-label="First group">
      <Button variant="secondary">1</Button>{' '}
      <Button variant="secondary">2</Button>{' '}
      <Button variant="secondary">3</Button>{' '}
      <Button variant="secondary">4</Button>
    </ButtonGroup>
    <InputGroup>
      <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
      <FormControl
        type="text"
        placeholder="Input group example"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon"
      />
    </InputGroup>
  </ButtonToolbar>

  <ButtonToolbar
    className="justify-content-between"
    aria-label="Toolbar with Button groups"
  >
    <ButtonGroup aria-label="First group">
      <Button variant="secondary">1</Button>{' '}
      <Button variant="secondary">2</Button>{' '}
      <Button variant="secondary">3</Button>{' '}
      <Button variant="secondary">4</Button>
    </ButtonGroup>
    <InputGroup>
      <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
      <FormControl
        type="text"
        placeholder="Input group example"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon2"
      />
    </InputGroup>
  </ButtonToolbar>
</>;
