<Form>
  {['checkbox', 'radio'].map(type => (
    <div key={`custom-${type}`} className="mb-3">
      <Form.Check // prettier-ignore
        custom
        type={type}
        id={`custom-${type}`}
        label={`Check this custom ${type}`}
      />

      <Form.Check
        custom
        disabled
        type={type}
        label={`disabled ${type}`}
        id={`disabled-custom-${type}`}
      />
    </div>
  ))}
</Form>;
