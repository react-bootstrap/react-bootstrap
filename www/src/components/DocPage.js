import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import PageHeader from './PageHeader';
import SideNav from './SideNav';

const propTypes = {

};

function DocPage({ title, subtitle, children }) {
  return (
    <div>
      <PageHeader
        title={title}
        subTitle={subtitle || ''}
      />
      <Grid>
        <Row>
          <Col md={9}>
            {children}
          </Col>
          <Col md={3} className="bs-docs-sidebar-holder">
            <SideNav />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

DocPage.propTypes = propTypes;

export default DocPage;
