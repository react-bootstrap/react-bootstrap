import React from 'react';
import { mount } from 'enzyme';

import Jumbotron from '../src/Jumbotron';

describe('<Jumbotron>', () => {
  it('Should output a div with content', () => {
    mount(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>,
    ).assertSingle('div.jumbotron strong');
  });

  it('Should have a fluid class', () => {
    mount(<Jumbotron fluid>Content</Jumbotron>).assertSingle(
      'div.jumbotron-fluid',
    );
  });

  it('Should override node class', () => {
    mount(
      <Jumbotron as="section">
        <strong>Content</strong>
      </Jumbotron>,
    ).assertSingle('section.jumbotron strong');
  });
  it('Should have div as default component', () => {
    mount(<Jumbotron />).assertSingle('div');
  });
});
