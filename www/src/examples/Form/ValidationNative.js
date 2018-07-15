class FormExample extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Row>
          <FormGroup as={Col} md="4" controlId="validationCustom01">
            <FormLabel>First name</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <FormControl.Feedback>Looks good!</FormControl.Feedback>
          </FormGroup>
          <FormGroup as={Col} md="4" controlId="validationCustom02">
            <FormLabel>Last name</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <FormControl.Feedback>Looks good!</FormControl.Feedback>
          </FormGroup>
          <FormGroup as={Col} md="4" controlId="validationCustomUsername">
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <FormControl.Feedback type="invalid">
                Please choose a username.
              </FormControl.Feedback>
            </InputGroup>
          </FormGroup>
        </Form.Row>
        <Form.Row>
          <FormGroup as={Col} md="6" controlId="validationCustom03">
            <FormLabel>City</FormLabel>
            <FormControl type="text" placeholder="City" required />
            <FormControl.Feedback type="invalid">
              Please provide a valid city.
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup as={Col} md="3" controlId="validationCustom04">
            <FormLabel>State</FormLabel>
            <FormControl type="text" placeholder="State" required />
            <FormControl.Feedback type="invalid">
              Please provide a valid state.
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup as={Col} md="3" controlId="validationCustom05">
            <FormLabel>Zip</FormLabel>
            <FormControl type="text" placeholder="Zip" required />
            <FormControl.Feedback type="invalid">
              Please provide a valid zip.
            </FormControl.Feedback>
          </FormGroup>
        </Form.Row>
        <FormGroup>
          <FormCheck
            required
            label="Agree to terms and conditions"
            invalidFeedback="You must agree before submitting."
          />
        </FormGroup>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}

render(<FormExample />);
