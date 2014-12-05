var inputTypeInstance = (
    <form>
      <Input type="text" label='Text' defaultValue="Enter text" />
      <Input type="email" label='Email Address' defaultValue="Enter email" />
      <Input type="password" label='Password' defaultValue="secret" />
  	  <Input type="file" label="File" help="[Optional] Block level help text" />
      <Input type="checkbox" label="Checkbox" checked readOnly />
      <Input type="radio" label="Radio" checked readOnly />
      <Input type="select" label='Select' defaultValue="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </Input>
      <Input type="select" label='Multiple Select' multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </Input>
      <Input type="textarea" label='Text Area' defaultValue="textarea" />
      <Input type="static" value="Static Text" />
      <Input type="submit" value="Submit button" />
    </form>
  );

React.render(inputTypeInstance, mountNode);
