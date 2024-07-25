import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeProvider, { createBootstrapComponent } from '../src/ThemeProvider';
import Button from '../src/Button';

describe('<ThemeProvider>', () => {
  const hocValue = 'foo';
  const Foo = createBootstrapComponent(
    class Foo extends React.Component<{ bsPrefix: string }, any> {
      render() {
        return (
          <p className={`${this.props.bsPrefix} ${this.props.bsPrefix}-bar`}>
            foo val
          </p>
        );
      }
    },
    hocValue,
  );

  it('should use HOC value', () => {
    render(
      <div>
        <Foo />
      </div>,
    );

    const fooElem = screen.getByText('foo val');
    expect(fooElem.classList).toContain(hocValue);
    expect(fooElem.tagName).toEqual('P');
  });

  it('should provide bsPrefix overrides', () => {
    render(
      <ThemeProvider prefixes={{ btn: 'my-btn', foo: 'global-foo' }}>
        <div>
          <Button variant="primary">My label</Button>
          <Foo />
        </div>
      </ThemeProvider>,
    );
    const buttonElem = screen.getByText('My label');
    expect(buttonElem.tagName).toEqual('BUTTON');
    expect(buttonElem.classList).toContain('my-btn');
    expect(buttonElem.classList).toContain('my-btn-primary');

    const fooElem = screen.getByText('foo val');
    expect(fooElem.tagName).toEqual('P');
    expect(fooElem.classList).toContain('global-foo');
  });

  it('should use prop bsPrefix first', () => {
    render(
      <ThemeProvider prefixes={{ foo: 'global-foo' }}>
        <div>
          <Foo bsPrefix="my-foo" />
        </div>
      </ThemeProvider>,
    );
    const fooElem = screen.getByText('foo val');
    expect(fooElem.tagName).toEqual('P');
    expect(fooElem.classList).toContain('my-foo');
  });

  it('should forward ref', () => {
    let ref;
    render(
      <div>
        <Foo bsPrefix="my-foo" ref={(r) => (ref = r)} />
      </div>,
    );
    // If the ref of rendered element has the correct bsPrefix, it means that
    // it has been forwarded correctly
    expect(screen.getByText('foo val').className).toContain(ref.props.bsPrefix);
  });
});
