import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavbarBrand from '../src/NavbarBrand';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', () => {
    render(<NavbarBrand data-testid="test">Brand</NavbarBrand>);
    const navbarBrandElem = screen.getByTestId('test');
    expect(navbarBrandElem.tagName).toEqual('SPAN');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });

  it('Should create NavbarBrand A (link) element', () => {
    render(
      <NavbarBrand href="/foo" data-testid="test">
        BrandLink
      </NavbarBrand>,
    );
    const navbarBrandElem = screen.getByTestId('test');
    expect(navbarBrandElem.tagName).toEqual('A');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });
});
