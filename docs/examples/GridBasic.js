/** @jsx React.DOM */

var navInstance = (
    <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>.col-xs-12 .col-md-8</Col>
          <Col xs={6} md={4}>.col-xs-6 .col-md-4</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}>.col-xs-6 .col-md-4</Col>
          <Col xs={6} md={4}>.col-xs-6 .col-md-4</Col>
          <Col xs={6} md={4}>.col-xs-6 .col-md-4</Col>
        </Row>

        <Row className="show-grid">
          <Col xs={3} xsOffset={9}>.col-xs-3 .col-xs-offset-9</Col>
        </Row>

        <Row className="show-grid">
          <Col md={9} mdPush={3}>.col-md-9 .col-md-push-3</Col>
          <Col md={3} mdPull={9}>.col-md-3 .col-md-pull-9</Col>
        </Row>
    </Grid>
  );

React.renderComponent(navInstance, mountNode);