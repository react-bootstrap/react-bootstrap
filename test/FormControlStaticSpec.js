import React from 'react';
import $ from 'teaspoon';

import FormControl from '../src/FormControl';

describe('<FormControl.Static>', () => {
  it('should render correctly', () => {
    expect(
      $(
        <FormControl.Static name="foo" className="my-form-control-static">
          Static text
        </FormControl.Static>
      )
        .shallowRender()
        .single('.form-control-static.my-form-control-static')
          .text()
    ).to.equal('Static text');
  });

  it('should support custom componentClass', () => {
    function MyComponent({ children, ...props }) {
      return (
        <div {...props}>{children}</div>
      );
    }

    expect(
      $(
        <FormControl.Static componentClass={MyComponent}>
          Static text
        </FormControl.Static>
      )
        .shallowRender()
        .single($.s`${MyComponent}.form-control-static`)
          .text()
    ).to.equal('Static text');
  });
});
