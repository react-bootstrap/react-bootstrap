const formInstance = (
  <Form inline>
    <FormGroup controlId="formInlineName">
      <FormLabel>Name</FormLabel>{' '}
      <FormControl type="text" placeholder="Jane Doe" />
    </FormGroup>{' '}
    <FormGroup controlId="formInlineEmail">
      <FormLabel>Email</FormLabel>{' '}
      <FormControl type="email" placeholder="jane.doe@example.com" />
    </FormGroup>{' '}
    <Button type="submit">Send invitation</Button>
  </Form>
);

render(formInstance);
