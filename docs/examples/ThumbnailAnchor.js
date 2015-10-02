const thumbnailInstance = (
<Grid>
  <Row>
  <Col xs={6} md={3}>
    <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
  </Col>
  <Col xs={6} md={3}>
    <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
  </Col>
  <Col xs={6} md={3}>
    <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
  </Col>
  </Row>
</Grid>
);

React.render(thumbnailInstance, mountNode);
