import { mount } from 'enzyme';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    mount(
      <Popover id="test-popover">
        <Popover.Header>Popover title</Popover.Header>
        <Popover.Body>
          <strong>Popover Content</strong>
        </Popover.Body>
      </Popover>,
    ).assertSingle(
      '.popover[x-placement="right"][role="tooltip"].bs-popover-end strong',
    );
  });
});
