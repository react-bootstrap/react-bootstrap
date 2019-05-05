import { mount } from 'enzyme';
import React from 'react';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    mount(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>,
    ).assertSingle('div.btn-group');
  });

  it('Should add size', () => {
    mount(
      <ButtonGroup size="lg">
        <Button>Title</Button>
      </ButtonGroup>,
    ).assertSingle('.btn-group-lg');
  });

  it('Should add vertical variation', () => {
    mount(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>,
    )
      .tap(b => b.assertSingle('.btn-group-vertical'))
      .assertNone('.btn-group');
  });

  it('Should add toggle variation', () => {
    mount(
      <ButtonGroup toggle>
        <Button>Title</Button>
      </ButtonGroup>,
    ).assertSingle('.btn-group.btn-group-toggle');
  });

  it('Should have div as default component', () => {
    mount(<ButtonGroup />).assertSingle('div');
  });
});
