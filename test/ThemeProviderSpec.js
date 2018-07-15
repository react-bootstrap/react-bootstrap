import React from 'react';
import { mount } from 'enzyme';

import ThemeProvider, { createBootstrapComponent } from '../src/ThemeProvider';
import Button from '../src/Button';

describe('<ThemeProvider>', () => {
  const Foo = createBootstrapComponent(
    class Foo extends React.Component {
      render() {
        return (
          <p className={`${this.props.bsPrefix} ${this.props.bsPrefix}-bar`} />
        );
      }
    },
    'foo',
  );

  it('should use HOC value', () => {
    const wrapper = mount(
      <div>
        <Foo />
      </div>,
    );

    wrapper.assertSingle('p.foo');
  });

  it('should provide bsPrefix overrides', () => {
    const wrapper = mount(
      <ThemeProvider prefixes={{ btn: 'my-btn', foo: 'global-foo' }}>
        <div>
          <Button variant="primary">My label</Button>
          <Foo />
        </div>
      </ThemeProvider>,
    );

    wrapper.assertSingle('button.my-btn.my-btn-primary');
    wrapper.assertSingle('p.global-foo');
  });

  it('should use prop bsPrefix first', () => {
    const wrapper = mount(
      <ThemeProvider prefixes={{ foo: 'global-foo' }}>
        <div>
          <Foo bsPrefix="my-foo" />
        </div>
      </ThemeProvider>,
    );

    wrapper.assertSingle('p.my-foo');
  });

  it('should forward ref', () => {
    let ref;
    const wrapper = mount(
      <div>
        <Foo bsPrefix="my-foo" ref={r => (ref = r)} />
      </div>,
    );

    expect(ref).to.equal(wrapper.find('Foo').instance());
  });
});
