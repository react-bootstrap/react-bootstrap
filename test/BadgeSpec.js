import React from 'react';
import { mount } from 'enzyme';

import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should render correctly', () => {
    expect(
      mount(
        <Badge variant="primary" pill>
          Message
        </Badge>,
      )
        .assertSingle('span.badge.badge-primary.badge-pill')
        .text(),
    ).to.equal('Message');
  });

  it('should support custom `as`', () => {
    mount(
      <Badge as="a" href="#" variant="primary" pill>
        Message
      </Badge>,
    ).assertSingle('a[href="#"]');
  });
});
