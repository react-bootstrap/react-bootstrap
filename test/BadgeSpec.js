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
});
