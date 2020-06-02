<Form>
  <fieldset disabled>
    <Form.Group>
      <Form.Label htmlFor="disabledTextInput">Disabled input</Form.Label>
      <Form.Control id="disabledTextInput" placeholder="Disabled input" />
    </Form.Group>
    <Form.Group>
      <Form.Label htmlFor="disabledSelect">Disabled select menu</Form.Label>
      <Form.Control as="select" id="disabledSelect">
        <option>Disabled select</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="Can't check this"
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </fieldset>
</Form>;
