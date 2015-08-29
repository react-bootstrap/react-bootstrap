const inputValidationInstance = (
  <form>
    <Input type="text" bsStyle="success" label="Success" hasFeedback />
    <Input type="text" bsStyle="warning" label="Warning" hasFeedback />
    <Input type="text" bsStyle="error" label="Error" hasFeedback />
  </form>
);

React.render(inputValidationInstance, mountNode);
