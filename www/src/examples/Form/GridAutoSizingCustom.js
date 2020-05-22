<Form>
  <Form.Row className="align-items-center">
    <Col xs="auto" className="my-1">
      <Form.Label className="mr-sm-2" for="inlineFormCustomSelect" srOnly>
        Preference
      </Form.Label>
      <Form.Control
        as="select"
        className="mr-sm-2"
        id="inlineFormCustomSelect"
        custom
      >
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Control>
    </Col>
    <Col xs="auto" className="my-1">
      <Form.Check
        type="checkbox"
        id="customControlAutosizing"
        label="Remember my preference"
        custom
      />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Row>
</Form>;
