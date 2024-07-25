import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, RenderResult, waitFor } from '@testing-library/react';
import Collapse, { CollapseProps } from '../src/Collapse';

describe('<Collapse>', () => {
  class Component extends React.Component<
    React.PropsWithChildren<Omit<CollapseProps, 'children'>>
  > {
    render() {
      const { children, ...props } = this.props;

      return (
        <Collapse
          getDimensionValue={() => 15}
          data-testid="collapse-component"
          {...props}
          {...this.state}
        >
          <div>
            <span data-testid={props.in ? 'status-show' : 'status-hide'} />
            {children}
          </div>
        </Collapse>
      );
    }
  }

  it('should not throw an error with StrictMode', () => {
    render(
      <React.StrictMode>
        <Component in>Panel content</Component>
      </React.StrictMode>,
    );
  });

  it('should work with a class component as children', () => {
    class InnerComponent extends React.Component {
      render() {
        return <div {...this.props}>Inner</div>;
      }
    }

    const onEnteringSpy = vi.fn();

    const { rerender } = render(
      <Collapse onEntering={onEnteringSpy}>
        <InnerComponent />
      </Collapse>,
    );

    rerender(
      <Collapse in onEntering={onEnteringSpy}>
        <InnerComponent />
      </Collapse>,
    );

    expect(onEnteringSpy).toHaveBeenCalledOnce();
  });

  it('Should default to collapsed', () => {
    render(<Component data-testid="test">Panel content</Component>);

    expect(screen.getByTestId('test').classList).not.toContain('show');
    expect(screen.getByTestId('status-hide')).toBeDefined();
  });

  it('Should have collapse class', () => {
    render(<Component>Panel content</Component>);

    expect(screen.getByTestId('collapse-component').classList).toContain(
      'collapse',
    );
  });

  describe('from collapsed to expanded', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<Component>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      renderResult.rerender(<Component in>Panel content</Component>);

      expect(screen.getByTestId('collapse-component').classList).toContain(
        'collapsing',
      );
    });

    it('Should set initial 0px height', async () => {
      const onEnterSpy = vi.fn();
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(
        <Component
          in
          onEnter={() => {
            expect(node.style.height).toEqual('0px');
            onEnterSpy();
          }}
        >
          Panel content
        </Component>,
      );

      await waitFor(() => expect(onEnterSpy).toHaveBeenCalled());
    });

    it('Should set node to height', () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.style.height).toEqual(`${node.scrollHeight}px`);
    });

    it('Should transition from collapsing to not collapsing', async () => {
      const node = screen.getByTestId('collapse-component');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.classList).toContain('collapsing');

      await waitFor(() => expect(node.classList).toContain('collapse'));
      expect(node.classList).toContain('show');
    });

    it('Should clear height after transition complete', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.style.height).toEqual(`${node.scrollHeight}px`);

      await waitFor(() => expect(node.style.height).toEqual(''));
    });
  });

  describe('from expanded to collapsed', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<Component in>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      renderResult.rerender(<Component in={false}>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapsing');
    });

    it('Should set initial height', async () => {
      const onExitSpy = vi.fn();
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(
        <Component
          in={false}
          onExit={() => {
            expect(node.style.height).toEqual('15px');
            onExitSpy();
          }}
        >
          Panel content
        </Component>,
      );

      await waitFor(() => expect(onExitSpy).toHaveBeenCalled());
    });

    it('Should set node to height', () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      expect(node.style.height).toEqual('');
    });

    it('Should transition from collapsing to not collapsing', async () => {
      const node = screen.getByTestId('collapse-component');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      expect(node.classList).toContain('collapsing');

      await waitFor(() => expect(node.classList).toContain('collapse'));
    });

    it('Should have no height after transition complete', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      await waitFor(() => expect(node.style.height).toEqual(''));
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', () => {
      render(<Component in>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapse');
      expect(node.classList).toContain('show');
    });
  });

  describe('dimension', () => {
    it('Should not have width in class', () => {
      render(<Component>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.className.includes('width')).toEqual(false);
    });

    it('Should have collapse-horizontal in class', () => {
      render(<Component dimension={() => 'width'}>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapse-horizontal');
    });
  });

  describe('with a role', () => {
    it('sets aria-expanded true when expanded', () => {
      const { getByRole } = render(
        <Component role="menuitem" in>
          Panel content
        </Component>,
      );

      expect(getByRole('menuitem', { expanded: true })).toBeDefined();
    });

    it('sets aria-expanded false when collapsed', () => {
      const { getByRole } = render(
        <Component role="menuitem" in={false}>
          Panel content
        </Component>,
      );

      expect(getByRole('menuitem', { expanded: false })).toBeDefined();
    });
  });
});
