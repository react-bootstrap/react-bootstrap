import PropTypes from 'prop-types';
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SideNav from './SideNav';

const propTypes = {
  location: PropTypes.object.isRequired
};

function Main({ children, ...props }) {
  return (
    <Grid>
      <Row>
        <Col md={3} className="bs-docs-sidebar-holder">
          <SideNav location={props.location} />
        </Col>
        <Col md={9}>{children}</Col>
      </Row>
    </Grid>
  );
}

Main.propTypes = propTypes;

export default Main;
