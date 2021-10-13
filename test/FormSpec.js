import { mount } from 'enzyme';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

describe('<Form>', () => {
  it('should support custom `as`', () => {
    mount(
      <Form as="fieldset" className="my-form">
        <FormGroup />
      </Form>,
    )
      .assertSingle('fieldset.my-form')
      .assertSingle('FormGroup');
  });

  it('Should have form as default component', () => {
    mount(<Form />).assertSingle('form');
  });

  it('should have form class `was-validated` if validated', () => {
    mount(<Form validated />).assertSingle('form.was-validated');
  });
});
