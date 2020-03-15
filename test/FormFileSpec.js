import { mount } from 'enzyme';
import React from 'react';
import FormFile from '../src/FormFile';

describe('<FormFile>', () => {
  it('should render correctly', () => {
    let wrapper = mount(
      <FormFile id="foo" name="foo" label="My label" className="my-file" />,
    );

    wrapper
      .assertSingle('div.form-file.my-file')
      .assertSingle('input[type="file"][name="foo"]');

    wrapper
      .assertSingle('label.form-file-label[htmlFor="foo"]')
      .text()
      .should.equal('My label');
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

  it('should supports custom', () => {
    const wrapper = mount(<FormFile custom label="My label" />);

    wrapper
      .assertSingle('div.custom-file')
      .assertSingle('input.custom-file-input');

    wrapper.assertSingle('label.custom-file-label');
  });

  it('should supports lang when custom', () => {
    const wrapper = mount(<FormFile custom lang="en" label="My label" />);

    expect(wrapper.prop('lang')).to.equal('en');
  });

  it('should supports data-browse when custom', () => {
    const wrapper = mount(
      <FormFile custom data-browse="foo" label="My label" />,
    );

    expect(wrapper.prop('data-browse')).to.equal('foo');
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
});
