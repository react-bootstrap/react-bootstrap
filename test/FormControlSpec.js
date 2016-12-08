import React from 'react';
import $ from 'teaspoon';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormControl>', () => {
  it('should render correctly', () => {
    $(
      <FormControl type="text" id="foo" name="bar" className="my-control" />
    )
      .shallowRender()
      .single('input#foo.form-control.my-control[name="bar"]');
  });

  it('should support textarea', () => {
    $(
      <FormControl componentClass="textarea" />
    )
      .shallowRender()
      .single('textarea.form-control');
  });

  it('should support select', () => {
    $(
      <FormControl componentClass="select" />
    )
      .shallowRender()
      .single('select.form-control');
  });

  it('should not render .form-control for type="file"', () => {
    $(
      <FormControl type="file" />
    )
      .shallowRender()
      .single('input[type="file"]')
        .none('.form-control');
  });

  it('should use controlId for id', () => {
    $(
      <FormGroup controlId="foo">
        <FormControl type="text" />
      </FormGroup>
    )
      .render()
      .single('input#foo.form-control');
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored');

    $(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" />
      </FormGroup>
    )
      .render()
      .single('input#bar.form-control');
  });

  it('should support inputRef', () => {
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormControl type="text" inputRef={ref => { this.input = ref; }} />
          </FormGroup>
        );
      }
    }

    const instance = $(<Container />).render().unwrap();
    expect(instance.input.tagName).to.equal('INPUT');
  });

  it('should properly display size of FormControl', () => {
    $(
      <FormControl type="text" bsSize="lg" />
    )
      .render()
      .single('input.form-control.input-lg');
  });

});
