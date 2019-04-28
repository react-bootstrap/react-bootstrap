import React from 'react';
import { mount } from 'enzyme';

import AccordionToggle from '../src/AccordionToggle';

describe('<AccordionToggle>', () => {
  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(AccordionToggle.defaultProps.as).to.be.undefined;
  });

  it('Should have button as default component', () => {
    mount(<AccordionToggle eventKey="" />).assertSingle('button');
  });
});
