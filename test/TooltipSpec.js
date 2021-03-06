import { mount } from 'enzyme';

import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    mount(
      <Tooltip id="test-tooltip" placement="right">
        <strong>Tooltip Content</strong>
      </Tooltip>,
    ).assertSingle(
      '.tooltip[x-placement="right"][role="tooltip"].bs-tooltip-end strong',
    );
  });
});
