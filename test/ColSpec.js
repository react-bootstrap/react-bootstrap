import React from 'react';
import { mount } from 'enzyme';

import Col from '../src/Col';

describe('Col', () => {
  it('Should include "col" when there are no sizes', () => {
    mount(<Col />).assertSingle('.col');
  });

  it('Should include "col" when xs is true', () => {
    mount(<Col xs />).assertSingle('.col');
    mount(<Col xs={{ span: true }} />).assertSingle('.col');
  });

  it('Should include sizes', () => {
    mount(<Col xs={4} md={8} />).assertSingle('.col-md-8.col-4');
  });

  it('Should include offsets', () => {
    mount(
      <Col
        xs={{ span: 4, offset: 1 }}
        md={{ span: 8, order: 1 }}
        lg={{ order: 'last' }}
      />,
    ).assertSingle('.col-md-8.order-md-1.col-4.offset-1.order-lg-last');
  });

  it('Should have div as default component', () => {
    mount(<Col />).assertSingle('div');
  });
});
