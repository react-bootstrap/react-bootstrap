function FieldGroup({ id, label, help, ...props }) {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </Form.Group>
  );
}

const formInstance = (
  <Form>
    <FieldGroup
      id="Form.ControlsText"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
    <FieldGroup
      id="Form.ControlsEmail"
      type="email"
      label="Email address"
      placeholder="Enter email"
    />
    <FieldGroup id="Form.ControlsPassword" label="Password" type="password" />
    <FieldGroup
      id="Form.ControlsFile"
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

    <Form.Group>
      <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
      <Checkbox inline>3</Checkbox>
    </Form.Group>
    <Form.Group>
      <Radio name="radioGroup" inline>
        1
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        2
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        3
      </Radio>
    </Form.Group>

    <Form.Group controlId="Form.ControlsSelect">
      <Form.Label>Select</Form.Label>
      <Form.Select placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="Form.ControlsSelectMultiple">
      <Form.Label>Multiple select</Form.Label>
      <Form.Select multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="Form.ControlsTextarea">
      <Form.Label>Textarea</Form.Label>
      <Form.Control as="textarea" placeholder="textarea" />
    </Form.Group>

    <Form.Group>
      <Form.Label>Static text</Form.Label>
      <Form.Control.Static>email@example.com</Form.Control.Static>
    </Form.Group>

    <Button type="submit">Submit</Button>
  </Form>
);

render(formInstance);
