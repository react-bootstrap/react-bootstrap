import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import Fade, { FadeProps } from '../src/Fade';

describe('Fade', () => {
  class Component extends React.Component<
    React.PropsWithChildren<Omit<FadeProps, 'children'>>
  > {
    render() {
      const { children, ...props } = this.props;

      return (
        <Fade data-testid="fade-component" {...props} {...this.state}>
          <div>
            <span data-testid={props.in ? 'status-show' : 'status-hide'} />
            {children}
          </div>
        </Fade>
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
    const onEnteringSpy = vi.fn();

    class InnerComponent extends React.Component {
      render() {
        return <div {...this.props}>test</div>;
      }
    }

    render(
      <Fade in onEntering={onEnteringSpy} data-testid="test">
        <InnerComponent />
      </Fade>,
    );

    const node = screen.getByTestId('test');
    expect(node.classList).toContain('fade');
    expect(node.classList).toContain('show');
  });

  it('Should default to hidden', () => {
    render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();
  });

  it('Should always have the "fade" class', () => {
    render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();
    expect(screen.getByTestId('fade-component').classList).toContain('fade');
  });

  it('Should add "in" class when entering', () => {
    const onEnteringSpy = vi.fn();

    const { rerender } = render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();

    rerender(
      <Component
        in
        onEntering={() => {
          const node = screen.getByTestId('fade-component');
          expect(node.classList).toContain('fade');
          expect(node.classList).toContain('show');
          onEnteringSpy();
        }}
      >
        Panel content
      </Component>,
    );

    waitFor(() => expect(onEnteringSpy).toHaveBeenCalled());
  });

  it('Should remove "in" class when exiting', () => {
    const onEnteringSpy = vi.fn();

    const { rerender } = render(<Component in>Panel content</Component>);

    const node = screen.getByTestId('fade-component');
    expect(node.classList).toContain('fade');
    expect(node.classList).toContain('show');

    rerender(
      <Component
        in={false}
        onExiting={() => {
          expect(node.classList).toContain('fade');
          expect(node.classList).not.toContain('show');
          onEnteringSpy();
        }}
      >
        Panel content
      </Component>,
    );

    waitFor(() => expect(onEnteringSpy).toHaveBeenCalled());
  });
});
