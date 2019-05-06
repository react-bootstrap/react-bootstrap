import React from 'react';
import { mount } from 'enzyme';

import AccordionToggle from '../src/AccordionToggle';

describe('<AccordionToggle>', () => {
  it('Should have button as default component', () => {
    mount(<AccordionToggle eventKey="" />).assertSingle('button');
  });
});
