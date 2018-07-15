<form>
  {['checkbox', 'radio'].map(type => (
    <div key={`default-${type}`} className="mb-3">
      <FormCheck // prettier-ignore
        type={type}
        id={`default-${type}`}
        label={`default ${type}`}
      />

      <FormCheck
        disabled
        type={type}
        label={`disabled ${type}`}
        id={`disabled-default-${type}`}
      />
    </div>
  ))}
</form>;
