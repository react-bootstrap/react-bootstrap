import { mount } from 'enzyme';
import React from 'react';
import FormCheck from '../src/FormCheck';
import Switch from '../src/Switch';

describe('<FormCheck>', () => {
  it('should render correctly', () => {
    let wrapper = mount(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        defaultChecked
        label="My label"
        className="my-checkbox"
      />,
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
        label="My label"
      />,
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
    mount(<FormCheck inline label="My label" />).assertSingle(
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
            ref={(ref) => {
              this.input = ref;
            }}
          />
        );
      }
    }

    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).to.equal('INPUT');
  });

  it('should supports custom', () => {
    const wrapper = mount(<FormCheck custom label="My label" />);

    wrapper
      .assertSingle('div.custom-control')
      .assertSingle('div.custom-checkbox')
      .assertSingle('input.custom-control-input');

    wrapper.assertSingle('label.custom-control-label');
  });

  it('should support custom with inline', () => {
    const wrapper = mount(<FormCheck custom inline label="My label" />);
    wrapper.assertSingle('div.custom-control-inline');
  });

  it('should supports switches', () => {
    let wrapper = mount(
      <FormCheck type="switch" label="My label" id="switch-id" />,
    );

    wrapper
      .assertSingle('div.custom-control')
      .assertSingle('div.custom-switch')
      .assertSingle('input[type="checkbox"].custom-control-input');

    wrapper.assertSingle('label.custom-control-label');
    wrapper.unmount();

    wrapper = mount(<Switch label="My label" id="switch-id2" />);

    wrapper
      .assertSingle('div.custom-control')
      .assertSingle('div.custom-switch')
      .assertSingle('input[type="checkbox"].custom-control-input');

    wrapper.assertSingle('label.custom-control-label');
  });

  it('should support "as"', () => {
    const Surrogate = ({ className = '', ...rest }) => (
      <input className={`extraClass ${className}'`} {...rest} />
    );
    const wrapper = mount(<FormCheck as={Surrogate} />);
    wrapper.assertSingle('input.extraClass[type="checkbox"]');
  });

  it('Should render valid feedback properly', () => {
    const wrapper = mount(<FormCheck label="My label" isValid />);
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('valid');
    expect(feedback.prop('tooltip')).to.be.false;
  });

  it('Should render invalid feedback properly', () => {
    const wrapper = mount(
      <FormCheck label="My label" isValid={false} isInvalid />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('invalid');
    expect(feedback.prop('tooltip')).to.be.false;
  });

  it('Should render valid feedback tooltip properly', () => {
    const wrapper = mount(
      <FormCheck label="My label" isValid feedbackTooltip />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('valid');
    expect(feedback.prop('tooltip')).to.be.true;
  });

  it('Should render invalid feedback tooltip properly', () => {
    const wrapper = mount(
      <FormCheck label="My label" isValid={false} isInvalid feedbackTooltip />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('invalid');
    expect(feedback.prop('tooltip')).to.be.true;
  });
});
