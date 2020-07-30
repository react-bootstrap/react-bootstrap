import { mount } from 'enzyme';
import React from 'react';
import FormFile from '../src/FormFile';

describe('<FormFile>', () => {
  it('should render correctly', () => {
    let wrapper = mount(
      <FormFile
        id="foo"
        name="foo"
        label="My label"
        buttonText="My browse"
        className="my-file"
      />,
    );

    wrapper
      .assertSingle('div.form-file.my-file')
      .assertSingle('input[type="file"][name="foo"]');

    wrapper.assertSingle('label.form-file-label[htmlFor="foo"]');

    wrapper.assertSingle('span.form-file-text').text().should.equal('My label');
    wrapper
      .assertSingle('span.form-file-button')
      .text()
      .should.equal('My browse');
  });

  it('should support size', () => {
    mount(<FormFile size="sm" />).assertSingle('.form-file-sm');
  });

  it('should support isValid', () => {
    mount(<FormFile isValid />).assertSingle('.is-valid');
  });

  it('should support isInvalid', () => {
    mount(<FormFile isInvalid />).assertSingle('.is-invalid');
  });

  it('should support ref forwarding', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormFile
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

  it('should support "inputAs"', () => {
    const Surrogate = ({ className = '', ...rest }) => (
      <input className={`extraClass ${className}'`} {...rest} />
    );
    const wrapper = mount(<FormFile inputAs={Surrogate} />);
    wrapper.assertSingle('input.extraClass[type="file"]');
  });

  it('Should have div as default component', () => {
    const wrapper = mount(<FormFile />);
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('should support "as"', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapperEl = document.createElement('wrapper-element');
    const Surrogate = ({ className = '', ...rest }) => (
      <wrapper-element className={`extraClass ${className}'`} {...rest} />
    );
    const wrapper = mount(<FormFile as={Surrogate} />);
    wrapper.assertSingle('wrapper-element.extraClass');
  });

  it('Should render valid feedback properly', () => {
    const wrapper = mount(<FormFile label="My label" isValid />);
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('valid');
    expect(feedback.prop('tooltip')).to.be.false;
  });

  it('Should render invalid feedback properly', () => {
    const wrapper = mount(
      <FormFile label="My label" isValid={false} isInvalid />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('invalid');
    expect(feedback.prop('tooltip')).to.be.false;
  });

  it('Should render valid feedback tooltip properly', () => {
    const wrapper = mount(
      <FormFile label="My label" isValid feedbackTooltip />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('valid');
    expect(feedback.prop('tooltip')).to.be.true;
  });

  it('Should render invalid feedback tooltip properly', () => {
    const wrapper = mount(
      <FormFile label="My label" isValid={false} isInvalid feedbackTooltip />,
    );
    const feedback = wrapper.find('Feedback');

    expect(feedback.prop('type')).to.equal('invalid');
    expect(feedback.prop('tooltip')).to.be.true;
  });
});
