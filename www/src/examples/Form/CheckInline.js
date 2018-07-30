<form>
  {['checkbox', 'radio'].map(type => (
    <div key={`inline-${type}`} className="mb-3">
      <FormCheck inline label="1" type={type} id={`inline-${type}-1`} />
      <FormCheck inline label="2" type={type} id={`inline-${type}-2`} />
      <FormCheck
        inline
        disabled
        label="3 (disabled)"
        type={type}
        id={`inline-${type}-3`}
      />
    </div>
  ))}
</form>;
