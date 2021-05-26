import * as React from 'react';
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

  it('should support plaintext inputs', () => {
    mount(<FormControl plaintext />).assertSingle(
      'input.form-control-plaintext',
    );
  });

  it('should support type=color', () => {
    mount(<FormControl type="color" />).assertSingle(
      'input.form-control.form-control-color',
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
              ref={(ref) => {
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

  it('should properly display html size of FormControl', () => {
    const wrapper = mount(<FormControl type="text" htmlSize={42} />);

    expect(wrapper.find('input').props().size).to.eq(42);
  });

  it('Should have input as default component', () => {
    mount(<FormControl />).assertSingle('input');
  });

  it('should support numbers as values', () => {
    const wrapper = mount(<FormControl value={10} onChange={() => {}} />);

    expect(wrapper.find('input').props().value).to.eq(10);
  });

  it('should support an array of strings as values', () => {
    const wrapper = mount(
      <FormControl value={['hello', 'world']} onChange={() => {}} />,
    );

    expect(wrapper.find('input').props().value).to.eql(['hello', 'world']);
  });
});
