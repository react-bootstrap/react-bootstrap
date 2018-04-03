import PropTypes from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SideNav from './SideNav';

const propTypes = {
  location: PropTypes.object.isRequired
};

function Main({ children, ...props }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={3} xl={2} className="bs-docs-sidebar-holder">
          <SideNav location={props.location} />
        </Col>
        <Col xs={12} md={9} xl={10}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

Main.propTypes = propTypes;

export default Main;
