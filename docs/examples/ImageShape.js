const imageShapeInstance = (
  <Grid>
    <Row>
      <Col xs={6} md={4}>
        <Image src="/assets/thumbnail.png" rounded />
      </Col>
      <Col xs={6} md={4}>
        <Image src="/assets/thumbnail.png" circle />
      </Col>
      <Col xs={6} md={4}>
        <Image src="/assets/thumbnail.png" thumbnail />
      </Col>
    </Row>
  </Grid>
);

React.render(imageShapeInstance, mountNode);
