import { mount } from 'enzyme';

import FloatingLabel from '../src/FloatingLabel';
import Form from '../src/Form';

describe('<FloatingLabel>', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <FloatingLabel label="MyLabel">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    wrapper
      .assertSingle('div.form-floating')
      .assertSingle('input[type="text"]');

    wrapper.assertSingle('label').text().should.equal('MyLabel');
  });

  it('should pass controlId to input and label', () => {
    const wrapper = mount(
      <FloatingLabel label="MyLabel" controlId="MyId">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    wrapper.assertSingle('input[id="MyId"]');
    wrapper.assertSingle('label[htmlFor="MyId"]');
  });

  it('should support "as"', () => {
    mount(
      <FloatingLabel label="MyLabel" as="span">
        <Form.Control type="text" />
      </FloatingLabel>,
    ).assertSingle('span.form-floating');
  });
});
