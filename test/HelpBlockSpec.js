import React from 'react';
import { shallow } from 'enzyme';

import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <FormText id="foo" className="my-help-block">
          Help contents
        </FormText>,
      )
        .assertSingle('#foo.help-block.my-help-block')
        .text(),
    ).to.equal('Help contents');
  });
});
