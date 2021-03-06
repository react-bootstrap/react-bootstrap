import { mount } from 'enzyme';

import AccordionButton from '../src/AccordionButton';

describe('<AccordionButton>', () => {
  it('Should have button as default component', () => {
    mount(<AccordionButton />).assertSingle('button[type="button"]');
  });

  it('Should allow rendering as different component', () => {
    mount(<AccordionButton as="div" />).assertSingle('div.accordion-button');
  });

  // Just to get full coverage on the useAccordionButton click handler.
  it('Should just work if there is no onSelect or onClick handler', () => {
    const wrapper = mount(<AccordionButton />);
    wrapper.simulate('click');
  });
});
