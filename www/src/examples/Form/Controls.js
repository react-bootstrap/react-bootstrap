function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const formInstance = (
  <form>
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
    <FieldGroup
      id="formControlsEmail"
      type="email"
      label="Email address"
      placeholder="Enter email"
    />
    <FieldGroup id="formControlsPassword" label="Password" type="password" />
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="File"
      help="Example block-level help text here."
    />

    <Checkbox checked readOnly>
      Checkbox
    </Checkbox>
    <Radio checked readOnly>
      Radio
    </Radio>

    <FormGroup>
      <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
      <Checkbox inline>3</Checkbox>
    </FormGroup>
    <FormGroup>
      <Radio name="radioGroup" inline>
        1
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        2
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        3
      </Radio>
    </FormGroup>

    <FormGroup controlId="formControlsSelect">
      <FormLabel>Select</FormLabel>
      <FormControl as="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <FormLabel>Multiple select</FormLabel>
      <FormControl as="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsTextarea">
      <FormLabel>Textarea</FormLabel>
      <FormControl as="textarea" placeholder="textarea" />
    </FormGroup>

    <FormGroup>
      <FormLabel>Static text</FormLabel>
      <FormControl.Static>email@example.com</FormControl.Static>
    </FormGroup>

    <Button type="submit">Submit</Button>
  </form>
);

render(formInstance);
