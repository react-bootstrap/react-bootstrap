import React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '../src/Grid';
import Col from '../src/Col';
import Row from '../src/Row';


storiesOf('Grid', module)
  .addDecorator((fn) => (
    <div className="example-grid">{fn()}</div>
  ))
  .add('Basic ✔', () => (
    <Grid>
      <Row className="justify-content-md-center">
        <Col xs lg={2}>
          1 of 3
        </Col>
        <Col md="auto">
          Variable width content
        </Col>
        <Col xs lg={2}>
          3 of 3
        </Col>
      </Row>
      <Row>
        <Col>
          1 of 3
        </Col>
        <Col md="auto">
          Variable width content
        </Col>
        <Col xs lg={2}>
          3 of 3
        </Col>
      </Row>
    </Grid>
  ))
