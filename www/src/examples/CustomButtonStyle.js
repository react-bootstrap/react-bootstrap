bootstrapUtils.addStyle(Button, 'custom');

const customButtonStyle = (
  <div>
    <style type="text/css">
      {`
    .btn-custom {
        background-color: purple;
        color: white;
    }
    `}
    </style>
    <Button bsStyle="custom">Custom</Button>
  </div>
);

render(customButtonStyle);
