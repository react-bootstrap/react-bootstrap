import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import PageHeader from '../components/PageHeader';
import SideNav from '../components/SideNav';
import Default from './default';

const propTypes = {

};

function DocPage({ children, ...props }) {
  return (
    <Default {...props}>
      <PageHeader
        title="Getting started"
        subTitle={''}
      />
      <Grid>
        <Row>
          <Col md={3} className="bs-docs-sidebar-holder">
            <SideNav />
          </Col>
          <Col md={9}>
            {children()}
          </Col>
        </Row>
      </Grid>
    </Default>
  );
}

DocPage.propTypes = propTypes;

export default DocPage;
