import React from 'react';
import { mount } from 'enzyme';

import FormCheck from '../src/FormCheck';

describe('<FormCheck>', () => {
  it('should render correctly', () => {
    let wrapper = mount(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        defaultChecked
        className="my-checkbox"
      >
        My label
      </FormCheck>,
    );

    wrapper
      .assertSingle('div.form-check.my-checkbox')
      .assertSingle('input[type="checkbox"][name="foo"][defaultChecked]');

    wrapper
      .assertSingle('label.form-check-label[htmlFor="foo"]')
      .text()
      .should.equal('My label');
  });

  it('should render radio correctly', () => {
    let wrapper = mount(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        type="radio"
        defaultChecked
        className="my-radio"
      >
        My label
      </FormCheck>,
    );

    wrapper
      .assertSingle('div.form-check.my-radio')
      .assertSingle('input[type="radio"][name="foo"][defaultChecked]');

    wrapper
      .assertSingle('label.form-check-label[htmlFor="foo"]')
      .text()
      .should.equal('My label');
  });

  it('should support inline', () => {
    mount(<FormCheck inline>My label</FormCheck>).assertSingle(
      'div.form-check-inline',
    );
  });

  it('should support isValid', () => {
    mount(<FormCheck isValid />).assertSingle('.is-valid');
  });

  it('should support isInvalid', () => {
    mount(<FormCheck isInvalid />).assertSingle('.is-invalid');
  });

  it('should support ref forwarding', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormCheck
            ref={ref => {
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
