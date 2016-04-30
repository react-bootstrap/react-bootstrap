import React from 'react';
import $ from 'teaspoon';

import Radio from '../src/Radio';

import { shouldWarn } from './helpers';

describe('<Radio>', () => {
  it('should render correctly', () => {
    $(
      <Radio name="foo" checked className="my-radio">
        My label
      </Radio>
    )
      .shallowRender()
      .single('div.radio.my-radio')
        .single('input[type="radio"][name="foo"][checked]')
          .end()
        .single('label')
          .tap($label => expect($label.text()).to.equal('My label'));
  });

  it('should support inline', () => {
    $(
      <Radio inline name="foo" className="my-radio">
        My label
      </Radio>
    )
      .shallowRender()
      .single('label.radio-inline.my-radio')
        .single('input[type="radio"][name="foo"]')
          .end()
        .tap($label => expect($label.text()).to.equal('My label'));
  });

  it('should support validation state', () => {
    $(
      <Radio validationState="success" />
    )
      .shallowRender()
      .single('.has-success');
  });

  it('should not support validation state when inline', () => {
    shouldWarn('ignored');

    $(
      <Radio inline validationState="success" />
    )
      .shallowRender()
      .none('.has-success');
  });

  it('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <Radio inputRef={ref => { this.input = ref; }} />
        );
      }
    }

    const instance = $(<Container />).render().unwrap();
    expect(instance.input.tagName).to.equal('INPUT');
  });
});
