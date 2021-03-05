import { mount } from 'enzyme';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<Feedback>', () => {
  it('should render default success', () => {
    mount(
      <FormGroup>
        <FormControl isValid />
        <FormControl.Feedback type="valid" />
      </FormGroup>,
    ).assertSingle('.valid-feedback');
  });

  it('should render default error', () => {
    mount(
      <FormGroup>
        <FormControl isInvalid />
        <FormControl.Feedback type="invalid" />
      </FormGroup>,
    ).assertSingle('.invalid-feedback');
  });

  it('should render custom component', () => {
    function MyComponent(props) {
      return <div {...props} />;
    }

    mount(<FormControl.Feedback as={MyComponent} />).assertSingle(
      'MyComponent.valid-feedback',
    );
  });
});
