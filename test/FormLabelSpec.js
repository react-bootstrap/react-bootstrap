import * as React from 'react';
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
  it('should use controlId for htmlFor when render as Col', () => {
    mount(
      <FormGroup controlId="foo">
        <FormLabel column sm={4} />
      </FormGroup>,
    ).assertSingle('label[htmlFor="foo"].col-sm-4.col-form-label');
  });

  it('should respect visuallyHidden', () => {
    mount(<FormLabel visuallyHidden>Label</FormLabel>).assertSingle(
      'label.form-label.visually-hidden',
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
              ref={(ref) => {
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

  it('should support ref forwarding when rendered as a Col', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              type="text"
              column
              ref={(ref) => {
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

  it('accepts as prop', () => {
    mount(<FormLabel as="legend">body</FormLabel>).assertSingle('legend');
  });

  it('should properly size itself when rendered as a Col', () => {
    mount(<FormLabel column="sm">Label</FormLabel>).assertSingle(
      'label.col-form-label.col-form-label-sm',
    );
    mount(<FormLabel column>Label</FormLabel>).assertSingle(
      'label.col-form-label',
    );
    mount(<FormLabel column="lg">Label</FormLabel>).assertSingle(
      'label.col-form-label.col-form-label-lg',
    );
    let labelComponent = mount(<FormLabel>Label</FormLabel>);
    labelComponent.assertNone('label.col-form-label');
    labelComponent.assertNone('label.col-form-label-sm');
    labelComponent.assertNone('label.col-form-label-lg');
  });
});
