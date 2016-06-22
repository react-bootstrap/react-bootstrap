import React from 'react';
import $ from 'teaspoon';

import Checkbox from '../src/Checkbox';

import { shouldWarn } from './helpers';

describe('<Checkbox>', () => {
  it('should render correctly', () => {
    $(
      <Checkbox name="foo" checked className="my-checkbox">
        My label
      </Checkbox>
    )
      .shallowRender()
      .single('div.checkbox.my-checkbox')
        .single('input[type="checkbox"][name="foo"][checked]')
          .end()
        .single('label')
          .tap($label => expect($label.text()).to.equal('My label'));
  });

  it('should support inline', () => {
    $(
      <Checkbox inline name="foo" className="my-checkbox">
        My label
      </Checkbox>
    )
      .shallowRender()
      .single('label.checkbox-inline.my-checkbox')
        .single('input[type="checkbox"][name="foo"]')
          .end()
        .tap($label => expect($label.text()).to.equal('My label'));
  });

  it('should support validation state', () => {
    $(
      <Checkbox validationState="success" />
    )
      .shallowRender()
      .single('.has-success');
  });

  it('should not support validation state when inline', () => {
    shouldWarn('ignored');

    $(
      <Checkbox inline validationState="success" />
    )
      .shallowRender()
      .none('.has-success');
  });

  it('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <Checkbox inputRef={ref => { this.input = ref; }} />
        );
      }
    }

    const instance = $(<Container />).render().unwrap();
    expect(instance.input.tagName).to.equal('INPUT');
  });
});
