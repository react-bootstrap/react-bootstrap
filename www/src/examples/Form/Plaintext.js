<form>
  <FormGroup as={Row} controlId="formPlaintextEmail">
    <FormLabel column sm="2">
      Email
    </FormLabel>
    <Col sm="10">
      <FormControl plaintext readOnly defaultValue="email@example.com" />
    </Col>
  </FormGroup>

  <FormGroup as={Row} controlId="formPlaintextPassword">
    <FormLabel column sm="2">
      Password
    </FormLabel>
    <Col sm="10">
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>
</form>;
