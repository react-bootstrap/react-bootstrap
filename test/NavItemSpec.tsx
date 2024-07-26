import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavItem from '../src/NavItem';

describe('<NavItem>', () => {
  it('should have div as default component', () => {
    render(<NavItem data-testid="test" />);
    const navItemElem = screen.getByTestId('test');

    expect(navItemElem.tagName).toEqual('DIV');
    expect(navItemElem.classList).toContain('nav-item');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<NavItem data-testid="test" as="section" />);
    const navItemElem = screen.getByTestId('test');

    expect(navItemElem.tagName).toEqual('SECTION');
    expect(navItemElem.classList).toContain('nav-item');
  });

  it('should pass classNames down and render children', () => {
    render(
      <NavItem data-testid="test" className="custom-class and-other">
        <strong>Children</strong>
      </NavItem>,
    );
    const navItemElem = screen.getByTestId('test');

    expect(navItemElem.classList).toContain('nav-item');
    expect(navItemElem.classList).toContain('custom-class');
    expect(navItemElem.classList).toContain('and-other');
    expect(navItemElem.firstElementChild!.tagName).toEqual('STRONG');
  });
});
