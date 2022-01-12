import { render } from '@testing-library/react';
import { expect } from 'chai';

import NavLink from '../src/NavLink';

describe('<NavLink>', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <NavLink
        className="custom-class"
        href="/some/unique-thing/"
        title="content"
        data-testid="test"
      >
        <strong>Children</strong>
      </NavLink>,
    );
    const navLinkElem = getByTestId('test');
    navLinkElem.classList.contains('nav-link').should.be.true;
    navLinkElem.classList.contains('custom-class').should.be.true;
    navLinkElem.getAttribute('href')!.should.equal('/some/unique-thing/');
    navLinkElem.getAttribute('title')!.should.equal('content');
    navLinkElem.firstElementChild!.tagName.toLowerCase().should.equal('strong');
  });

  it('Should add active class', () => {
    const { getByTestId } = render(
      <NavLink active data-testid="test">
        Item content
      </NavLink>,
    );
    const navLinkElem = getByTestId('test');
    navLinkElem.classList.contains('active').should.be.true;
  });

  it('Should add disabled class', () => {
    const { getByTestId } = render(
      <NavLink disabled data-testid="test">
        Item content
      </NavLink>,
    );
    const navLinkElem = getByTestId('test');
    navLinkElem.classList.contains('disabled').should.be.true;
  });

  describe('Web Accessibility', () => {
    it('Should add aria-selected to the link when role is "tab"', () => {
      const { getByTestId } = render(
        <NavLink role="tab" active data-testid="test">
          Item content
        </NavLink>,
      );
      const navLinkElem = getByTestId('test');
      navLinkElem.tagName.toLowerCase().should.equal('a');
      navLinkElem.getAttribute('aria-selected')!.should.equal('true');
    });

    it('Should not add aria-selected to the link when role is not "tab"', () => {
      const { getByTestId } = render(
        <NavLink role="button" active data-testid="test">
          Item content
        </NavLink>,
      );
      const navLinkElem = getByTestId('test');
      navLinkElem.tagName.toLowerCase().should.equal('a');
      expect(navLinkElem.getAttribute('aria-selected')).to.be.null;
    });
  });
});
