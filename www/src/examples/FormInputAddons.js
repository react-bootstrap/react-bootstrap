<form>
  <FormGroup>
    <InputGroup>
      <InputGroup.Addon>@</InputGroup.Addon>
      <FormControl type="text" />
    </InputGroup>
  </FormGroup>
  <FormGroup>
    <InputGroup>
      <FormControl type="text" />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>
  </FormGroup>
  <FormGroup>
    <InputGroup>
      <InputGroup.Addon>$</InputGroup.Addon>
      <FormControl type="text" />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>
  </FormGroup>

  <FormGroup>
    <InputGroup>
      <FormControl type="text" />
      <InputGroup.Addon>
        <Glyphicon glyph="music" />
      </InputGroup.Addon>
    </InputGroup>
  </FormGroup>

  <FormGroup>
    <InputGroup>
      <InputGroup.Button>
        <Button>Before</Button>
      </InputGroup.Button>
      <FormControl type="text" />
    </InputGroup>
  </FormGroup>
  <FormGroup>
    <InputGroup>
      <FormControl type="text" />
      <DropdownButton
        componentClass={InputGroup.Button}
        id="input-dropdown-addon"
        title="Action"
      >
        <MenuItem key="1">Item</MenuItem>
      </DropdownButton>
    </InputGroup>
  </FormGroup>

  <FormGroup>
    <InputGroup>
      <InputGroup.Addon>
        <input type="radio" aria-label="..." />
      </InputGroup.Addon>
      <FormControl type="text" />
    </InputGroup>
  </FormGroup>
  <FormGroup>
    <InputGroup>
      <InputGroup.Addon>
        <input type="checkbox" aria-label="..." />
      </InputGroup.Addon>
      <FormControl type="text" />
    </InputGroup>
  </FormGroup>
</form>;
