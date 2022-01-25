import { render } from '@testing-library/react';

import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    const { getByRole } = render(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    getByRole('group').should.exist;
  });

  it('Should add size', () => {
    const { getByRole } = render(
      <ButtonGroup size="lg">
        <Button>Title</Button>
      </ButtonGroup>,
    );

    getByRole('group').classList.contains('btn-group-lg').should.be.true;
  });

  it('Should add vertical variation', () => {
    const { getByRole } = render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    const group = getByRole('group');
    group.classList.contains('btn-group-vertical').should.be.true;
    group.classList.contains('btn-group').should.be.false;
  });

  it('Should have div as default component', () => {
    const { getByRole } = render(<ButtonGroup />);

    getByRole('group').tagName.toLowerCase().should.equal('div');
  });

  it('Should allow component tag customization', () => {
    const { getByRole } = render(<ButtonGroup as="article" />);

    getByRole('group').tagName.toLowerCase().should.equal('article');
  });
});
