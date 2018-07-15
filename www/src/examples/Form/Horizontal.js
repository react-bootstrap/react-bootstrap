<Form>
  <FormGroup as={Row} controlId="formHorizontalEmail">
    <FormLabel column sm={2}>
      Email
    </FormLabel>
    <Col sm={10}>
      <FormControl type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup as={Row} controlId="formHorizontalPassword">
    <FormLabel column sm={2}>
      Password
    </FormLabel>
    <Col sm={10}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>
  <fieldset>
    <FormGroup as={Row}>
      <FormLabel as="legend" column sm={2}>
        Radios
      </FormLabel>
      <Col sm={10}>
        <FormCheck
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <FormCheck
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <FormCheck
          type="radio"
          label="third radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </FormGroup>
  </fieldset>
  <FormGroup as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 2 }}>
      <FormCheck label="Remember me" />
    </Col>
  </FormGroup>

  <FormGroup as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Sign in</Button>
    </Col>
  </FormGroup>
</Form>;
