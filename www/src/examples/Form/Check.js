<form>
  {['checkbox', 'radio'].map(type => (
    <div key={`default-${type}`} className="mb-3">
      <FormCheck type={type} id={`default-${type}`}>
        default {type}
      </FormCheck>
      <FormCheck type={type} disabled id={`disabled-default-${type}`}>
        disabled {type}
      </FormCheck>
    </div>
  ))}
</form>;
