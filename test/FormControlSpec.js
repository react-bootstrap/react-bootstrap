import React from 'react';
import { mount } from 'enzyme';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormControl>', () => {
  it('should render correctly', () => {
    mount(
      <FormControl type="text" id="foo" name="bar" className="my-control" />,
    ).assertSingle('input#foo.form-control.my-control[name="bar"]');
  });

  it('should support textarea', () => {
    mount(<FormControl as="textarea" />).assertSingle('textarea.form-control');
  });

  it('should support select', () => {
    mount(<FormControl as="select" />).assertSingle('select.form-control');
  });

  it('should support type=file', () => {
    mount(<FormControl type="file" />)
      .assertSingle('[type="file"].form-control-file')
      .assertNone('.form-control');
  });

  it('should support plaintext inputs', () => {
    mount(<FormControl plaintext />).assertSingle(
      'input.form-control-plaintext',
    );
  });

  it('should use controlId for id', () => {
    mount(
      <FormGroup controlId="foo">
        <FormControl type="text" />
      </FormGroup>,
    ).assertSingle('input#foo.form-control');
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored');

    mount(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" />
      </FormGroup>,
    ).assertSingle('input#bar.form-control');
  });

  it('should support ref forwarding', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormControl
              type="text"
              ref={ref => {
                this.input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    const instance = mount(<Container />).instance();
    expect(instance.input.tagName).to.equal('INPUT');
  });

  it('should properly display size of FormControl', () => {
    mount(<FormControl type="text" size="lg" />).assertSingle(
      'input.form-control.form-control-lg',
    );
  });

  it('Should have input as default component', () => {
    mount(<FormControl />).assertSingle('input');
  });
});
