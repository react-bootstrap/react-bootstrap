import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import ToggleButton from '../src/ToggleButton';

describe('ToggleButton', () => {
  it('should forward refs to the label', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <ToggleButton id="id" ref={ref} value={1}>
        Option
      </ToggleButton>,
    );

    ref.current!.tagName.should.equal('LABEL');
  });

  it('should add an inputRef', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <ToggleButton id="id" inputRef={ref} value={1}>
        Option
      </ToggleButton>,
    );

    ref.current!.tagName.should.equal('INPUT');
  });

  it('should not have a role on the label button', () => {
    const { getByText } = render(
      <ToggleButton id="id" value={1}>
        Option
      </ToggleButton>,
    );

    expect(getByText('Option').getAttribute('role')).to.not.exist;
  });
});
