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
    mount(<Col xs={4} md={8} lg={{ span: 12 }} />).assertSingle(
      '.col-md-8.col-4.col-lg-12',
    );
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

  it('Should allow span to be null', () => {
    const wrapper = mount(<Col xs="6" md={{ span: null, order: 1 }} />);
    wrapper.assertSingle('.col-6.order-md-1');
    wrapper.find('div').hasClass('col-md').should.equal(false);
  });

  it('Should allow span to be false', () => {
    const wrapper = mount(<Col xs="6" md={{ span: false, order: 1 }} />);
    wrapper.assertSingle('.col-6.order-md-1');
    wrapper.find('div').hasClass('col-md').should.equal(false);
  });

  it('Should allow span to be auto', () => {
    mount(<Col md="auto" lg={{ span: 'auto' }} />).assertSingle(
      '.col-md-auto.col-lg-auto',
    );
  });

  it('Should have div as default component', () => {
    mount(<Col />).assertSingle('div');
  });
});
