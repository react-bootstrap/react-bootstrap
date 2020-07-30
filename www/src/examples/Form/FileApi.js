<Form>
  <div className="mb-3">
    <Form.File id="formcheck-api-custom" custom>
      <Form.File.Input isValid />
      <Form.File.Label>
        <Form.File.Text>Custom file input</Form.File.Text>
        <Form.File.Button>Button text</Form.File.Button>
      </Form.File.Label>
      <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
    </Form.File>
  </div>
  <div className="mb-3">
    <Form.File id="formcheck-api-regular">
      <Form.File.Label>
        <Form.File.Text>Regular file input</Form.File.Text>
        <Form.File.Button>Browse</Form.File.Button>
      </Form.File.Label>
      <Form.File.Input />
    </Form.File>
  </div>
</Form>;
