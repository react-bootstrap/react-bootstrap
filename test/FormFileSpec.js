import { mount } from 'enzyme';
import React from 'react';
import FormFile from '../src/FormFile';

describe('<FormFile>', () => {
  it('should render correctly', () => {
    let wrapper = mount(
      <FormFile id="foo" name="foo" label="My label" className="my-file" />,
    );

    wrapper
      .assertSingle('div.form-group.my-file')
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

  it('should supports buttonText when custom', () => {
    const wrapper = mount(
      <FormFile custom buttonText="foo" label="My label" />,
    );

    const labelEl = wrapper.find('label.custom-file-label');

    expect(labelEl.prop('data-browse')).to.equal('foo');
  });

  it('should support "as"', () => {
    const Surrogate = ({ className = '', ...rest }) => (
      <input className={`extraClass ${className}'`} {...rest} />
    );
    const wrapper = mount(<FormFile as={Surrogate} />);
    wrapper.assertSingle('input.extraClass[type="file"]');
  });
});
