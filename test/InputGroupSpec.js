import React from 'react';
import { mount, shallow } from 'enzyme';

import Button from '../src/Button';
import FormControl from '../src/FormControl';
import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('should render properly', () => {
    const wrapper = mount(
      <InputGroup className="my-input-group">
        <InputGroup.Prepend className="my-addon">
          <InputGroup.Text>Foo</InputGroup.Text>

          <InputGroup.Radio checked />
          <InputGroup.Checkbox checked />
        </InputGroup.Prepend>

        <FormControl type="text" />

        <Button>Bar</Button>
      </InputGroup>
    ).assertSingle('.input-group.my-input-group');

    wrapper
      .assertSingle('.input-group-prepend.my-addon')
      .text()
      .should.equal('Foo');

    wrapper.assertSingle('input.form-control[type="text"]');

    wrapper.assertSingle('input[type=radio][checked=true]');
    wrapper.assertSingle('input[type=checkbox][checked]');
  });

  it('should support bsSize', () => {
    shallow(<InputGroup bsSize="small" />).assertSingle(
      '.input-group.input-group-sm'
    );
  });
});
