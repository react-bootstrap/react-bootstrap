<Form>
  <Row className="align-items-center">
    <Col xs="auto" className="my-1">
      <Form.Label
        className="me-sm-2"
        htmlFor="inlineFormCustomSelect"
        visuallyHidden
      >
        Preference
      </Form.Label>
      <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
        <option value="0">Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </Col>
    <Col xs="auto" className="my-1">
      <Form.Check
        type="checkbox"
        id="customControlAutosizing"
        label="Remember my preference"
      />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Submit</Button>
    </Col>
  </Row>
</Form>;
