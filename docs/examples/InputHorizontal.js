const inputHorizontalInstance = (
  <form className="form-horizontal">
    <Input type="text" label="Text" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
    <Input type="textarea" label="Textarea" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
    <Input type="checkbox" label="Checkbox" wrapperClassName="col-xs-offset-2 col-xs-10" help="Offset is applied to wrapper." />
  </form>
);

React.render(inputHorizontalInstance, mountNode);
