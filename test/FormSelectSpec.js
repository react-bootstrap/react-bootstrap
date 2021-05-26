import { mount } from 'enzyme';

import FormSelect from '../src/FormSelect';

describe('<FormSelect>', () => {
  it('should render correctly', () => {
    mount(
      <FormSelect id="foo" name="bar" className="my-control" />,
    ).assertSingle('select#foo.form-select.my-control[name="bar"]');
  });

  it('should render size correctly', () => {
    mount(<FormSelect size="lg" />).assertSingle(
      'select.form-select.form-select-lg',
    );
  });

  it('should render htmlSize correctly', () => {
    const wrapper = mount(<FormSelect htmlSize={3} />);

    expect(wrapper.find('select').props().size).to.eq(3);
  });

  it('should render isValid correctly', () => {
    mount(<FormSelect isValid />).assertSingle('select.form-select.is-valid');
  });

  it('should render isInvalid correctly', () => {
    mount(<FormSelect isInvalid />).assertSingle(
      'select.form-select.is-invalid',
    );
  });
});
