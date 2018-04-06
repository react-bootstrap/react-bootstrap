import React from 'react';
import { shallow } from 'enzyme';

import FormControl from '../src/FormControl';

describe('<FormControl.Static>', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <FormControl.Static name="foo" className="my-form-control-static">
          Static text
        </FormControl.Static>
      )
        .assertSingle('.form-control-static.my-form-control-static')
        .text()
    ).to.equal('Static text');
  });

  it('should support custom as', () => {
    function MyComponent({ children, ...props }) {
      return <div {...props}>{children}</div>;
    }

    expect(
      shallow(
        <FormControl.Static as={MyComponent}>Static text</FormControl.Static>
      )
        .assertSingle('MyComponent.form-control-static')
        .contains('Static text')
    ).to.equal(true);
  });
});
