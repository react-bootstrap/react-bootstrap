import { mount } from 'enzyme';

import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const wrapper = mount(<InputGroup />);
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('Should render size correctly', () => {
    mount(<InputGroup size="sm" />).assertSingle('.input-group-sm');
  });

  it('Should render hasValidation correctly', () => {
    mount(<InputGroup hasValidation />).assertSingle('.has-validation');
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';
      const wrapper = mount(<InputGroup.Checkbox name={name} />);
      const input = wrapper.find('FormCheckInput');
      expect(input.length).to.equal(1);
      expect(input.prop('name')).to.equal(name);
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';
      const wrapper = mount(<InputGroup.Radio name={name} />);
      const input = wrapper.find('FormCheckInput');
      expect(input.length).to.equal(1);
      expect(input.prop('name')).to.equal(name);
    });
  });
});
