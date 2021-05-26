import { mount } from 'enzyme';

import NavbarBrand from '../src/NavbarBrand';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', () => {
    mount(<NavbarBrand>Brand</NavbarBrand>).assertSingle('span.navbar-brand');
  });

  it('Should create NavbarBrand A (link) element', () => {
    mount(<NavbarBrand href="/foo">BrandLink</NavbarBrand>).assertSingle(
      'a.navbar-brand',
    );
  });
});
