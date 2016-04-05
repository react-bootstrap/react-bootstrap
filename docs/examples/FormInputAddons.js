const formInstance = (
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
        {/* Set z-index here to work around some layout quirks. */}
        <InputGroup.Button style={{ zIndex: 1000 }}>
          <DropdownButton title="Action" id="input-dropdown-addon">
            <MenuItem key="1">Item</MenuItem>
          </DropdownButton>
        </InputGroup.Button>
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
  </form>
);

ReactDOM.render(formInstance, mountNode);
