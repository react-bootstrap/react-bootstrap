import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageItem, { First } from '../src/PageItem';

describe('<PageItem>', () => {
  describe('<First>', () => {
    it('should have expected default innerText', () => {
      render(<First data-testid="test" />);
      const firstElem = screen.getByTestId('test');

      expect(firstElem.classList).toContain('page-link');

      expect(firstElem.firstElementChild!.tagName).toEqual('SPAN');
      expect(firstElem.firstElementChild!.getAttribute('aria-hidden')).toEqual(
        'true',
      );
      expect(firstElem.firstElementChild!.textContent).toEqual('«');
    });
    it('should have expected custom innerText', () => {
      const innerHTML = 'custom';
      render(<First data-testid="test">{innerHTML}</First>);
      const firstElem = screen.getByTestId('test');

      expect(firstElem.firstElementChild!.textContent).toEqual(innerHTML);
    });

    it('should render a nested span if active is true', () => {
      const { container } = render(<PageItem active />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemElem.classList).toContain('active');
      expect(pageItemInnerElem.classList).toContain('page-link');

      // check if nested span is rendered
      expect(pageItemInnerElem.firstElementChild!.tagName).toEqual('SPAN');
    });

    it('should render a span if disabled is true', () => {
      const { container } = render(<PageItem disabled />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemElem.classList).toContain('disabled');
      expect(pageItemInnerElem.classList).toContain('page-link');
    });

    it('should apply className to the inner component if linkClassName is set', () => {
      const { container } = render(
        <PageItem linkClassName="custom-class-name" />,
      );
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemInnerElem.classList).toContain('custom-class-name');
    });

    it('should apply style to the inner component if linkStyle is set', () => {
      const { container } = render(<PageItem linkStyle={{ color: 'red' }} />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemInnerElem.getAttribute('style')).toEqual('color: red;');
    });

    it('should support custom anchor element', () => {
      const Component = ({ children, ...props }) => (
        <a {...props} data-anchor="custom">
          {children}
        </a>
      );
      const { container } = render(<PageItem as={Component} />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;
      expect(pageItemInnerElem.getAttribute('data-anchor')).toEqual('custom');
    });
  });
});
