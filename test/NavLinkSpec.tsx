import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavLink from '../src/NavLink';

describe('<NavLink>', () => {
  it('renders correctly', () => {
    render(
      <NavLink
        className="custom-class"
        href="/some/unique-thing/"
        title="content"
        data-testid="test"
      >
        <strong>Children</strong>
      </NavLink>,
    );
    const navLinkElem = screen.getByTestId('test');
    expect(navLinkElem.classList).toContain('nav-link');
    expect(navLinkElem.classList).toContain('custom-class');
    expect(navLinkElem.getAttribute('href')).toEqual('/some/unique-thing/');
    expect(navLinkElem.getAttribute('title')).toEqual('content');
    expect(navLinkElem.firstElementChild!.tagName).toEqual('STRONG');
  });

  it('Should add active class', () => {
    render(
      <NavLink active data-testid="test">
        Item content
      </NavLink>,
    );
    const navLinkElem = screen.getByTestId('test');
    expect(navLinkElem.classList).toContain('active');
  });

  it('Should add disabled class', () => {
    render(
      <NavLink disabled data-testid="test">
        Item content
      </NavLink>,
    );
    const navLinkElem = screen.getByTestId('test');
    expect(navLinkElem.classList).toContain('disabled');
  });

  describe('Web Accessibility', () => {
    it('Should add aria-selected to the link when role is "tab"', () => {
      render(
        <NavLink role="tab" active data-testid="test">
          Item content
        </NavLink>,
      );
      const navLinkElem = screen.getByTestId('test');
      expect(navLinkElem.tagName).toEqual('A');
      expect(navLinkElem.getAttribute('aria-selected')).toEqual('true');
    });

    it('Should not add aria-selected to the link when role is not "tab"', () => {
      render(
        <NavLink role="button" active data-testid="test">
          Item content
        </NavLink>,
      );
      const navLinkElem = screen.getByTestId('test');
      expect(navLinkElem.tagName).toEqual('A');
      expect(navLinkElem.getAttribute('aria-selected')).toBeNull();
    });
  });
});
