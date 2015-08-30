const inputWrapperInstance = (
  <Input label="Input wrapper" help="Use this when you need something other than the available input types." wrapperClassName="wrapper">
    <Row>
      <Col xs={6}>
        <input type="text" className="form-control" />
      </Col>
      <Col xs={6}>
        <input type="text" className="form-control" />
      </Col>
    </Row>
  </Input>
);

React.render(inputWrapperInstance, mountNode);
