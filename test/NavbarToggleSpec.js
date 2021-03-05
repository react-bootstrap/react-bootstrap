import { mount } from 'enzyme';

import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    mount(<NavbarToggle />).assertSingle('button');
  });
});
