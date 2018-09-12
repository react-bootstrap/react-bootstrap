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
});
