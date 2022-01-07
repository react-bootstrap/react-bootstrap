import * as React from 'react';

import { render } from '@testing-library/react';
import ThemeProvider, { createBootstrapComponent } from '../src/ThemeProvider';
import Button from '../src/Button';

describe('<ThemeProvider>', () => {
  const hocValue = 'foo';
  const Foo = createBootstrapComponent(
    class Foo extends React.Component<{ bsPrefix: string }, any> {
      render() {
        return (
          <p className={`${this.props.bsPrefix} ${this.props.bsPrefix}-bar`} />
        );
      }
    },
    hocValue,
  );

  it('should use HOC value', () => {
    const { container } = render(
      <div>
        <Foo />
      </div>,
    );

    container.firstElementChild!.classList.contains(hocValue);
    container.firstElementChild!.tagName === 'p';
  });

  it('should provide bsPrefix overrides', () => {
    const { container } = render(
      <ThemeProvider prefixes={{ btn: 'my-btn', foo: 'global-foo' }}>
        <div>
          <Button variant="primary">My label</Button>
          <Foo />
        </div>
      </ThemeProvider>,
    );
    container.firstElementChild!.tagName === 'button';
    container.firstElementChild!.classList.contains('my-btn');
    container.firstElementChild!.classList.contains('my-btn-primary');

    container.lastElementChild!.tagName === 'p';
    container.lastElementChild!.classList.contains('global-foo');
  });

  it('should use prop bsPrefix first', () => {
    const { container } = render(
      <ThemeProvider prefixes={{ foo: 'global-foo' }}>
        <div>
          <Foo bsPrefix="my-foo" />
        </div>
      </ThemeProvider>,
    );
    container.firstElementChild!.tagName === 'p';
    container.firstElementChild!.classList.contains('my-foo');
  });

  it('should forward ref', () => {
    let ref;
    const { container } = render(
      <div>
        <Foo bsPrefix="my-foo" ref={(r) => (ref = r)} />
      </div>,
    );
    // If the ref of rendered element has the correct bsPrefix, it means that it has been forwarded correctly
    container.firstElementChild!.className.includes(ref.props.bsPrefix);
  });
});
