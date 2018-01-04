import React from 'react';
import { mount, shallow } from 'enzyme';

import Button from '../src/Button';
import FormControl from '../src/FormControl';
import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('should render properly', () => {
    const wrapper = mount(
      <InputGroup className="my-input-group">
        <InputGroup.Addon className="my-addon">Foo</InputGroup.Addon>

        <FormControl type="text" />

        <InputGroup.Button className="my-button">
          <Button>Bar</Button>
        </InputGroup.Button>
      </InputGroup>
    ).assertSingle('.input-group.my-input-group');

    wrapper
      .assertSingle('.input-group-addon.my-addon')
      .text()
      .should.equal('Foo');

    wrapper.assertSingle('input.form-control[type="text"]');

    wrapper.assertSingle('.input-group-btn.my-button').assertSingle(Button);
  });

  it('should support bsSize', () => {
    shallow(<InputGroup bsSize="small" />).assertSingle(
      '.input-group.input-group-sm'
    );
  });
});
