import { render } from '@testing-library/react';
import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    const { getByTestId } = render(
      <Tooltip data-testid="test-tooltip" placement="right">
        <strong>Tooltip Content</strong>
      </Tooltip>,
    );

    getByTestId('test-tooltip').classList.should.contains([
      'tooltip',
      'bs-tooltip-end',
    ]);

    getByTestId('test-tooltip')
      .getAttribute('x-placement')!
      .should.equal('right');
  });
});
