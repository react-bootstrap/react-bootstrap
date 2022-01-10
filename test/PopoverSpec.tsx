import { render } from '@testing-library/react';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    const { getByTestId } = render(
      <Popover data-testid="test" id="test-popover">
        <Popover.Header>Popover title</Popover.Header>
        <Popover.Body>
          <strong>Popover Content</strong>
        </Popover.Body>
      </Popover>,
    );
    const popoverElem = getByTestId('test');
    const popoverArrowElem = popoverElem.children[0]!;
    const popoverHeaderElem = popoverElem.children[1]!;
    const popoverBodyElem = popoverElem.children[2]!;

    popoverElem.getAttribute('x-placement')!.should.equal('right');
    popoverElem.getAttribute('role')!.should.equal('tooltip');
    popoverElem.classList.contains('popover').should.be.true;
    popoverElem.classList.contains('bs-popover-end').should.be.true;

    popoverArrowElem.classList.contains('popover-arrow').should.be.true;
    popoverHeaderElem.classList.contains('popover-header').should.be.true;
    popoverBodyElem.classList.contains('popover-body').should.be.true;
  });
});
