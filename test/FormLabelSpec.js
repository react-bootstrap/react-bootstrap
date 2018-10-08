import React from 'react';
import { mount } from 'enzyme';

import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormLabel>', () => {
  it('should render correctly', () => {
    mount(
      <FormLabel id="foo" name="bar" className="my-control" />,
    ).assertSingle('label#foo.form-label.my-control[name="bar"]');
  });

  it('should use controlId for htmlFor', () => {
    mount(
      <FormGroup controlId="foo">
        <FormLabel type="text" />
      </FormGroup>,
    ).assertSingle('label[htmlFor="foo"].form-label');
  });
  it('should render as a Col', () => {
    mount(
      <FormLabel column sm={4}>
        Label
      </FormLabel>,
    ).assertSingle('label.col-sm-4.col-form-label');
  });

  it('should respect srOnly', () => {
    mount(<FormLabel srOnly>Label</FormLabel>).assertSingle(
      'label.form-label.sr-only',
    );
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    mount(
      <FormGroup controlId="foo">
        <FormLabel type="text" htmlFor="bar" />
      </FormGroup>,
    ).assertSingle('label[htmlFor="bar"]');
  });

  it('should support ref forwarding', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
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
    expect(instance.input.tagName).to.equal('LABEL');
  });
});
