import React from 'react';
import { shallow } from 'enzyme';

import HelpBlock from '../src/HelpBlock';

describe('<HelpBlock>', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <HelpBlock id="foo" className="my-help-block">
          Help contents
        </HelpBlock>
      )
        .assertSingle('#foo.help-block.my-help-block')
        .text()
    ).to.equal('Help contents');
  });
});
