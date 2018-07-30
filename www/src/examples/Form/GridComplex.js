<form>
  <Form.Row>
    <FormGroup as={Col} controlId="formGridEmail">
      <FormLabel>Email</FormLabel>
      <FormControl type="email" placeholder="Enter email" />
    </FormGroup>

    <FormGroup as={Col} controlId="formGridPassword">
      <FormLabel>Password</FormLabel>
      <FormControl type="password" placeholder="Password" />
    </FormGroup>
  </Form.Row>

  <FormGroup controlId="formGridAddress1">
    <FormLabel>Address</FormLabel>
    <FormControl placeholder="1234 Main St" />
  </FormGroup>

  <FormGroup controlId="formGridAddress2">
    <FormLabel>Address 2</FormLabel>
    <FormControl placeholder="Apartment, studio, or floor" />
  </FormGroup>

  <Form.Row>
    <FormGroup as={Col} controlId="formGridCity">
      <FormLabel>City</FormLabel>
      <FormControl />
    </FormGroup>

    <FormGroup as={Col} controlId="formGridState">
      <FormLabel>State</FormLabel>
      <FormControl as="select">
        <option>Choose...</option>
        <option>...</option>
      </FormControl>
    </FormGroup>

    <FormGroup as={Col} controlId="formGridZip">
      <FormLabel>Zip</FormLabel>
      <FormControl />
    </FormGroup>
  </Form.Row>

  <FormGroup id="formGridCheckbox">
    <FormCheck type="checkbox" label="Check me out" />
  </FormGroup>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</form>;
