import React from 'react';
import { shallowRender } from 'enzyme';

import Col from '../src/Col';

describe('Col', () => {
  it('Should include "col" when there are no sizes', () => {
    shallowRender(<Col />).assertSingle('.col');
  });

  it('Should include "col" when xs is true', () => {
    shallowRender(<Col xl />).assertSingle('.col');
  });

  it('Should include sizes', () => {
    shallowRender(<Col xl={4} md={8} />).assertSingle('.col-md-8.col-4');
  });
});
