const formInstance = (
  <form>
    <FormGroup controlId="formControlsText">
      <ControlLabel>Text</ControlLabel>
      <FormControl type="text" placeholder="Enter text" />
    </FormGroup>
    <FormGroup controlId="formControlsEmail">
      <ControlLabel>Email address</ControlLabel>
      <FormControl type="email" placeholder="Enter email" />
    </FormGroup>
    <FormGroup controlId="formControlsPassword">
      <ControlLabel>Password</ControlLabel>
      <FormControl type="password" />
    </FormGroup>
    <FormGroup controlId="formControlsFile">
      <ControlLabel>File</ControlLabel>
      <FormControl type="file" />
      <HelpBlock>Example block-level help text here.</HelpBlock>
    </FormGroup>

    <Checkbox checked readOnly>
      Checkbox
    </Checkbox>
    <Radio checked readOnly>
      Radio
    </Radio>

    {/* This requires React 15's <span>-less spaces to be exactly correct. */}
    <FormGroup>
      <Checkbox inline>
        1
      </Checkbox>
      <Checkbox inline>
        2
      </Checkbox>
      <Checkbox inline>
        3
      </Checkbox>
    </FormGroup>
    <FormGroup>
      <Radio inline>
        1
      </Radio>
      <Radio inline>
        2
      </Radio>
      <Radio inline>
        3
      </Radio>
    </FormGroup>

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Multiple select</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Textarea</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>

    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>
        email@example.com
      </FormControl.Static>
    </FormGroup>

    <Button type="submit">
      Submit
    </Button>
  </form>
);

ReactDOM.render(formInstance, mountNode);
