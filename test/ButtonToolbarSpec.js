import { mount } from 'enzyme';

import Button from '../src/Button';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    mount(
      <ButtonToolbar>
        <Button>Title</Button>
      </ButtonToolbar>,
    ).assertSingle('div.btn-toolbar[role="toolbar"]');
  });
});
