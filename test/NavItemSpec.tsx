import { render } from '@testing-library/react';

import NavItem from '../src/NavItem';

describe('<NavItem>', () => {
  it('should have div as default component', () => {
    const { getByTestId } = render(<NavItem data-testid="test" />);
    const navItemElem = getByTestId('test');

    navItemElem.tagName.toLowerCase().should.equal('div');
    navItemElem.classList.contains('nav-item').should.be.true;
  });

  it('should allow custom elements instead of "div"', () => {
    const { getByTestId } = render(<NavItem data-testid="test" as="section" />);
    const navItemElem = getByTestId('test');

    navItemElem.tagName.toLowerCase().should.equal('section');
    navItemElem.classList.contains('nav-item').should.be.true;
  });

  it('should pass classNames down and render children', () => {
    const { getByTestId } = render(
      <NavItem data-testid="test" className="custom-class and-other">
        <strong>Children</strong>
      </NavItem>,
    );
    const navItemElem = getByTestId('test');

    navItemElem.classList.contains('nav-item').should.be.true;
    navItemElem.classList.contains('custom-class').should.be.true;
    navItemElem.classList.contains('and-other').should.be.true;
    navItemElem.firstElementChild!.tagName.toLowerCase().should.equal('strong');
  });
});
