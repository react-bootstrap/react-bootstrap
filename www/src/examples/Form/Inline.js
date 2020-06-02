<Form inline>
  <Form.Label htmlFor="inlineFormInputName2" srOnly>
    Name
  </Form.Label>
  <Form.Control
    className="mb-2 mr-sm-2"
    id="inlineFormInputName2"
    placeholder="Jane Doe"
  />
  <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
    Username
  </Form.Label>
  <InputGroup className="mb-2 mr-sm-2">
    <InputGroup.Prepend>
      <InputGroup.Text>@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl id="inlineFormInputGroupUsername2" placeholder="Username" />
  </InputGroup>
  <Form.Check
    type="checkbox"
    className="mb-2 mr-sm-2"
    id="inlineFormCheck"
    label="Remember me"
  />
  <Button type="submit" className="mb-2">
    Submit
  </Button>
</Form>;
