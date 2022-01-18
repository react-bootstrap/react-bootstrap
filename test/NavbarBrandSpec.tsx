import { render } from '@testing-library/react';
import NavbarBrand from '../src/NavbarBrand';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', () => {
    const { getByTestId } = render(
      <NavbarBrand data-testid="test">Brand</NavbarBrand>,
    );
    const navbarBrandElem = getByTestId('test');
    navbarBrandElem.tagName.toLowerCase().should.equal('span');
    navbarBrandElem.classList.contains('navbar-brand').should.be.true;
  });

  it('Should create NavbarBrand A (link) element', () => {
    const { getByTestId } = render(
      <NavbarBrand href="/foo" data-testid="test">
        BrandLink
      </NavbarBrand>,
    );
    const navbarBrandElem = getByTestId('test');
    navbarBrandElem.tagName.toLowerCase().should.equal('a');
    navbarBrandElem.classList.contains('navbar-brand').should.be.true;
  });
});
