<form>
  {['checkbox', 'radio'].map(type => (
    <div key={type} className="mb-3">
      <FormCheck id={`check-api-${type}`}>
        <FormCheck.Input type={type} isValid />
        <FormCheck.Label>{`Custom api ${type}`}</FormCheck.Label>
        <FormControl.Feedback type="valid">You did it!</FormControl.Feedback>
      </FormCheck>
    </div>
  ))}
</form>;
