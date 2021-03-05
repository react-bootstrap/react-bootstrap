import { mount } from 'enzyme';

import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    expect(
      mount(
        <FormText id="foo" className="my-form-text">
          Help contents
        </FormText>,
      )
        .assertSingle('#foo.form-text.my-form-text')
        .text(),
    ).to.equal('Help contents');
  });

  it('Should have small as default component', () => {
    mount(<FormText />).assertSingle('small');
  });

  it('Should have "form-text" & "text-muted" class', () => {
    expect(
      mount(<FormText muted />)
        .find('small.form-text')
        .hasClass('text-muted'),
    ).to.be.true;
  });
});
