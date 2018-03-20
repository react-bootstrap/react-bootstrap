<form>
  <FormGroup controlId="formValidationSuccess1" validationState="success">
    <FormLabel>Input with success</FormLabel>
    <FormControl type="text" />
    <HelpBlock>Help text with validation state.</HelpBlock>
  </FormGroup>

  <FormGroup controlId="formValidationWarning1" validationState="warning">
    <FormLabel>Input with warning</FormLabel>
    <FormControl type="text" />
  </FormGroup>

  <FormGroup controlId="formValidationError1" validationState="error">
    <FormLabel>Input with error</FormLabel>
    <FormControl type="text" />
  </FormGroup>

  <FormGroup controlId="formValidationNull" validationState={null}>
    <FormLabel>Input with no validation state</FormLabel>
    <FormControl type="text" />
  </FormGroup>

  <FormGroup controlId="formValidationSuccess2" validationState="success">
    <FormLabel>Input with success and feedback icon</FormLabel>
    <FormControl type="text" />
    <FormControl />
  </FormGroup>

  <FormGroup controlId="formValidationWarning2" validationState="warning">
    <FormLabel>Input with warning and feedback icon</FormLabel>
    <FormControl type="text" />
    <FormControl />
  </FormGroup>

  <FormGroup controlId="formValidationError2" validationState="error">
    <FormLabel>Input with error and feedback icon</FormLabel>
    <FormControl type="text" />
    <FormControl />
  </FormGroup>

  <FormGroup controlId="formValidationSuccess3" validationState="success">
    <FormLabel>Input with success and custom feedback icon</FormLabel>
    <FormControl type="text" />
    <FormControl.Feedback />
  </FormGroup>

  <FormGroup controlId="formValidationWarning3" validationState="warning">
    <FormLabel>Input group with warning</FormLabel>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>@</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl type="text" />
    </InputGroup>
    <FormControl />
  </FormGroup>

  <Form componentClass="fieldset" horizontal>
    <FormGroup controlId="formValidationError3" validationState="error">
      <Col componentClass={FormLabel} xs={3}>
        Input with error
      </Col>
      <Col xs={9}>
        <FormControl type="text" />
        <FormControl />
      </Col>
    </FormGroup>

    <FormGroup controlId="formValidationSuccess4" validationState="success">
      <Col componentClass={FormLabel} xs={3}>
        Input group with success
      </Col>
      <Col xs={9}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type="text" />
        </InputGroup>
        <FormControl />
      </Col>
    </FormGroup>
  </Form>

  <Form componentClass="fieldset" inline>
    <FormGroup controlId="formValidationWarning4" validationState="warning">
      <FormLabel>Input with warning</FormLabel> <FormControl type="text" />
      <FormControl />
    </FormGroup>{' '}
    <FormGroup controlId="formValidationError4" validationState="error">
      <FormLabel>Input group with error</FormLabel>{' '}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="text" />
      </InputGroup>
      <FormControl />
    </FormGroup>
  </Form>

  <Checkbox validationState="success">Checkbox with success</Checkbox>
  <Radio validationState="warning">Radio with warning</Radio>
  <Checkbox validationState="error">Checkbox with error</Checkbox>

  {/* This requires React 15's <span>-less spaces to be exactly correct. */}
  <FormGroup validationState="success">
    <Checkbox inline>Checkbox</Checkbox> <Checkbox inline>with</Checkbox>{' '}
    <Checkbox inline>success</Checkbox>
  </FormGroup>
</form>;
