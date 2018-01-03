import React from 'react';
import { mount, shallow } from 'enzyme';

import Checkbox from '../src/Checkbox';

import { shouldWarn } from './helpers';

describe('<Checkbox>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Checkbox name="foo" checked className="my-checkbox">
        My label
      </Checkbox>
    );

    wrapper
      .assertSingle('div.checkbox.my-checkbox')
      .assertSingle('input[type="checkbox"][name="foo"][checked]');

    wrapper
      .assertSingle('label')
      .text()
      .should.equal('My label');
  });

  it('should support inline', () => {
    const wrapper = shallow(
      <Checkbox inline name="foo" className="my-checkbox">
        My label
      </Checkbox>
    );

    wrapper
      .assertSingle('label.checkbox-inline.my-checkbox')
      .assertSingle('input[type="checkbox"][name="foo"]');

    wrapper
      .assertSingle('label')
      .text()
      .should.equal('My label');
  });

  it('should support validation state', () => {
    shallow(<Checkbox validationState="success" />).assertSingle(
      '.has-success'
    );
  });

  it('should not support validation state when inline', () => {
    shouldWarn('ignored');

    shallow(<Checkbox inline validationState="success" />)
      .find('.has-success')
      .should.have.length(0);
  });

  it('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <Checkbox
            inputRef={ref => {
              this.input = ref;
            }}
          />
        );
      }
    }

    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).to.equal('INPUT');
  });
});
