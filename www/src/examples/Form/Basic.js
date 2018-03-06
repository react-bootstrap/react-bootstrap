<form>
  <FormGroup controlId="formBasicEmail">
    <FormLabel>Email address</FormLabel>
    <FormControl type="email" placeholder="Enter email" />
    <FormText className="text-muted">
      We'll never share your email with anyone else.
    </FormText>
  </FormGroup>

  <FormGroup controlId="formBasicPassword">
    <FormLabel>Password</FormLabel>
    <FormControl type="password" placeholder="Password" />
  </FormGroup>
  <FormGroup>
    <FormCheck type="checkbox">Check me out</FormCheck>
  </FormGroup>
  <Button bsStyle="primary" type="submit">
    Submit
  </Button>
</form>;
