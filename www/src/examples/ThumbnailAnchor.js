const thumbnailInstance = (
  <Grid>
    <Row>
      <Col xs={6} md={3}>
        <Thumbnail href="#" alt="171x180" src="/thumbnail.png" />
      </Col>
      <Col xs={6} md={3}>
        <Thumbnail href="#" alt="171x180" src="/thumbnail.png" />
      </Col>
      <Col xs={6} md={3}>
        <Thumbnail href="#" alt="171x180" src="/thumbnail.png" />
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(thumbnailInstance, mountNode);
