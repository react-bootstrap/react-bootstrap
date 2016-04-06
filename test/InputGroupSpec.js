import React from 'react';
import $ from 'teaspoon';

import Button from '../src/Button';
import FormControl from '../src/FormControl';
import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('should render properly', () => {
    $(
      <InputGroup className="my-input-group">
        <InputGroup.Addon className="my-addon">
          Foo
        </InputGroup.Addon>

        <FormControl type="text" />

        <InputGroup.Button className="my-button">
          <Button>Bar</Button>
        </InputGroup.Button>
      </InputGroup>
    )
      .render()
      .single('.input-group.my-input-group')
        .end()
      .single('.input-group-addon.my-addon')
        .tap($addon => expect($addon.text()).to.equal('Foo'))
        .end()
      .single('input.form-control[type="text"]')
        .end()
      .single('.input-group-btn.my-button')
        .single($.s`${Button}`);
  });

  it('should support bsSize', () => {
    $(
      <InputGroup bsSize="small" />
    )
      .shallowRender()
      .single('.input-group.input-group-sm');
  });
});
