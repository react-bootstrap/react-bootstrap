import { mount } from 'enzyme';

import FormControl from '../src/FormControl';
import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

describe('<FormGroup>', () => {
  it('renders children', () => {
    mount(
      <FormGroup>
        <span className="child1" />
        <span className="child2" />
      </FormGroup>,
    ).assertSingle('.child1');
  });

  it('provided controlId to label and control', () => {
    let wrapper = mount(
      <FormGroup controlId="my-control">
        <div>
          <FormLabel>label</FormLabel>
          <FormControl />
        </div>
      </FormGroup>,
    );

    wrapper.assertSingle('label[htmlFor="my-control"]');
    wrapper.assertSingle('input[id="my-control"]');
  });

  it('Should have div as default component', () => {
    const wrapper = mount(<FormGroup />);
    expect(wrapper.find('div').length).to.equal(1);
  });
});
