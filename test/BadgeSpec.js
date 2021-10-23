import { mount } from 'enzyme';

import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should render correctly', () => {
    expect(
      mount(
        <Badge bg="primary" pill>
          Message
        </Badge>,
      )
        .assertSingle('span.badge.bg-primary.rounded-pill')
        .text(),
    ).to.equal('Message');
  });

  it('should support custom `as`', () => {
    mount(
      <Badge as="a" href="#" bg="primary" pill>
        Message
      </Badge>,
    ).assertSingle('a[href="#"]');
  });

  it('Should default to bg="primary"', () => {
    mount(<Badge>Message</Badge>).assertSingle(`.bg-primary`);
  });

  it('Should use bg class', () => {
    mount(<Badge bg="danger">Message</Badge>).assertSingle('.bg-danger');
  });

  it('Should not have bg class when bg=null', () => {
    const wrapper = mount(<Badge bg={null}>Message</Badge>);
    expect(wrapper.find('.bg-primary').length).to.equal(0);
  });
});
