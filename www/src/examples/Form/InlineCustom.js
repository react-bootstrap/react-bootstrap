<Form inline>
  <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
    Preference
  </Form.Label>
  <Form.Control
    as="select"
    className="my-1 mr-sm-2"
    id="inlineFormCustomSelectPref"
    custom
  >
    <option value="0">Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </Form.Control>
  <Form.Check
    type="checkbox"
    className="my-1 mr-sm-2"
    id="customControlInline"
    label="Remember my preference"
    custom
  />
  <Button type="submit" className="my-1">
    Submit
  </Button>
</Form>;
