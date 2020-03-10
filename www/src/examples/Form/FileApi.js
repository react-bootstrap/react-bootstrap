<Form>
  <div className="mb-3">
    <Form.File id="formcheck-api" custom>
      <Form.File.Input isValid />
      <Form.File.Label>Custom file input</Form.File.Label>
      <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
    </Form.File>
  </div>
  <div className="mb-3">
    <Form.File id="formcheck-api">
      <Form.File.Label>Regular file input</Form.File.Label>
      <Form.File.Input />
    </Form.File>
  </div>
</Form>;
