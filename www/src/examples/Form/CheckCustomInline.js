<Form>
  {['checkbox', 'radio'].map(type => (
    <div key={`custom-inline-${type}`} className="mb-3">
      <Form.Check
        custom
        inline
        label="1"
        type={type}
        id={`custom-inline-${type}-1`}
      />
      <Form.Check
        custom
        inline
        label="2"
        type={type}
        id={`custom-inline-${type}-2`}
      />
      <Form.Check
        custom
        inline
        disabled
        label="3 (disabled)"
        type={type}
        id={`custom-inline-${type}-3`}
      />
    </div>
  ))}
</Form>;
