import { render } from '@testing-library/react';

import Button from '../src/Button';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    const { getByRole } = render(
      <ButtonToolbar>
        <Button>Title</Button>
      </ButtonToolbar>,
    );

    getByRole('toolbar').classList.contains('btn-toolbar').should.be.true;
  });

  it('Should allow a custom prefix', () => {
    const { getByRole } = render(
      <ButtonToolbar bsPrefix="my-custom-toolbar">
        <Button>Title</Button>
      </ButtonToolbar>,
    );

    const toolbar = getByRole('toolbar');
    toolbar.classList.contains('my-custom-toolbar').should.be.true;
    toolbar.classList.contains('btn-toolbar').should.be.false;
  });
});
