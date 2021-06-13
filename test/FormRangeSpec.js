import { mount } from 'enzyme';

import FormRange from '../src/FormRange';
import FormGroup from '../src/FormGroup';

describe('<FormRange>', () => {
  it('should render correctly', () => {
    mount(
      <FormRange id="foo" name="bar" className="my-control" />,
    ).assertSingle('input#foo.form-range.my-control[type="range"][name="bar"]');
  });

  it('should render controlId as id correctly', () => {
    mount(
      <FormGroup controlId="test-id">
        <FormRange />
      </FormGroup>,
    ).assertSingle('.form-range#test-id');
  });

  it('should override controlId correctly', () => {
    mount(
      <FormGroup controlId="test-id">
        <FormRange id="overridden-id" />
      </FormGroup>,
    ).assertSingle('.form-range#overridden-id:not(#test-id)');
  });
});
