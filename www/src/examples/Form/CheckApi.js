<Form>
  {['checkbox', 'radio'].map(type => (
    <div key={type} className="mb-3">
      <Form.Check id={`check-api-${type}`}>
        <Form.Check.Input type={type} isValid />
        <Form.Check.Label>{`Custom api ${type}`}</Form.Check.Label>
        <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
      </Form.Check>
    </div>
  ))}
</Form>;
