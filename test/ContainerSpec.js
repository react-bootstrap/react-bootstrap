import React from 'react';
import { mount } from 'enzyme';

import Container from '../src/Container';

describe('<Container>', () => {
  it('should render props correctly', () => {
    mount(<Container className="whatever" />).assertSingle(
      'div.container.whatever',
    );
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    mount(<Container fluid />).assertSingle('.container-fluid');
  });

  it('turns grid into "full-width" layout via size="fluid" property set', () => {
    mount(<Container size="fluid" />).assertSingle('.container-fluid');
  });

  it('allows custom elements instead of "div"', () => {
    mount(<Container as="section" />).assertSingle('section.container');
  });

  it('Should include size breakpoint class when size is set', () => {
    mount(<Container size="sm" />).assertSingle('.container-sm');
  });

  it('Should have div as default component', () => {
    mount(<Container />).assertSingle('div');
  });
});
