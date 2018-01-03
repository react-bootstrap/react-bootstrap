import React from 'react';
import { mount, shallow } from 'enzyme';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormControl>', () => {
  it('should render correctly', () => {
    shallow(
      <FormControl type="text" id="foo" name="bar" className="my-control" />
    ).assertSingle('input#foo.form-control.my-control[name="bar"]');
  });

  it('should support textarea', () => {
    shallow(<FormControl componentClass="textarea" />).assertSingle(
      'textarea.form-control'
    );
  });

  it('should support select', () => {
    shallow(<FormControl componentClass="select" />).assertSingle(
      'select.form-control'
    );
  });

  it('should not render .form-control for type="file"', () => {
    shallow(<FormControl type="file" />)
      .assertSingle('input[type="file"]')
      .find('.form-control')
      .should.have.length(0);
  });

  it('should use controlId for id', () => {
    mount(
      <FormGroup controlId="foo">
        <FormControl type="text" />
      </FormGroup>
    ).assertSingle('input#foo.form-control');
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored');

    mount(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" />
      </FormGroup>
    ).assertSingle('input#bar.form-control');
  });

  it('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormControl
              type="text"
              inputRef={ref => {
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
    mount(<FormControl type="text" bsSize="lg" />).assertSingle(
      'input.form-control.input-lg'
    );
  });
});
