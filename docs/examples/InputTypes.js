var inputTypeInstance = (
    <form>
      <Input type="text" defaultValue="text" />
      <Input type="password" defaultValue="secret" />
      <Input type="checkbox" checked readOnly label="checkbox"/>
      <Input type="radio" checked readOnly label="radio"/>
      <Input type="select" defaultValue="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </Input>
      <Input type="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </Input>
      <Input type="textarea" defaultValue="textarea" />
      <Input type="static" value="static" />
      <Input type="submit" bsStyle='primary' value="Submit button" />
    </form>
  );

React.render(inputTypeInstance, mountNode);
