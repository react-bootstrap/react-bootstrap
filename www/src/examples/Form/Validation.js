<Form>
  <Form.Group controlId="formValidationSuccess1" validationState="success">
    <Form.Label>Input with success</Form.Label>
    <Form.Control type="text" />
    <HelpBlock>Help text with validation state.</HelpBlock>
  </Form.Group>

  <Form.Group controlId="formValidationWarning1" validationState="warning">
    <Form.Label>Input with warning</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group controlId="formValidationError1" validationState="error">
    <Form.Label>Input with error</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group controlId="formValidationNull" validationState={null}>
    <Form.Label>Input with no validation state</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group controlId="formValidationSuccess2" validationState="success">
    <Form.Label>Input with success and feedback icon</Form.Label>
    <Form.Control type="text" />
    <Form.Control />
  </Form.Group>

  <Form.Group controlId="formValidationWarning2" validationState="warning">
    <Form.Label>Input with warning and feedback icon</Form.Label>
    <Form.Control type="text" />
    <Form.Control />
  </Form.Group>

  <Form.Group controlId="formValidationError2" validationState="error">
    <Form.Label>Input with error and feedback icon</Form.Label>
    <Form.Control type="text" />
    <Form.Control />
  </Form.Group>

  <Form.Group controlId="formValidationSuccess3" validationState="success">
    <Form.Label>Input with success and custom feedback icon</Form.Label>
    <Form.Control type="text" />
    <Form.Control.Feedback />
  </Form.Group>

  <Form.Group controlId="formValidationWarning3" validationState="warning">
    <Form.Label>Input group with warning</Form.Label>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>@</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control type="text" />
    </InputGroup>
    <Form.Control />
  </Form.Group>

  <Form as="fieldset" horizontal>
    <Form.Group controlId="formValidationError3" validationState="error">
      <Col as={Form.Label} xs={3}>
        Input with error
      </Col>
      <Col xs={9}>
        <Form.Control type="text" />
        <Form.Control />
      </Col>
    </Form.Group>

    <Form.Group controlId="formValidationSuccess4" validationState="success">
      <Col as={Form.Label} xs={3}>
        Input group with success
      </Col>
      <Col xs={9}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="text" />
        </InputGroup>
        <Form.Control />
      </Col>
    </Form.Group>
  </Form>

  <Form as="fieldset">
    <Form.Group controlId="formValidationWarning4" validationState="warning">
      <Form.Label>Input with warning</Form.Label> <Form.Control type="text" />
      <Form.Control />
    </Form.Group>{' '}
    <Form.Group controlId="formValidationError4" validationState="error">
      <Form.Label>Input group with error</Form.Label>{' '}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type="text" />
      </InputGroup>
      <Form.Control />
    </Form.Group>
  </Form>

  <Checkbox validationState="success">Checkbox with success</Checkbox>
  <Radio validationState="warning">Radio with warning</Radio>
  <Checkbox validationState="error">Checkbox with error</Checkbox>

  {/* This requires React 15's <span>-less spaces to be exactly correct. */}
  <Form.Group validationState="success">
    <Checkbox inline>Checkbox</Checkbox> <Checkbox inline>with</Checkbox>{' '}
    <Checkbox inline>success</Checkbox>
  </Form.Group>
</Form>;
