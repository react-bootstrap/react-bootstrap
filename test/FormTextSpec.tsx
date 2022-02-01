import { render } from '@testing-library/react';
import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormText data-testid="foo" className="my-form-text">
        Help content
      </FormText>,
    );

    const formText = getByTestId('foo');
    formText.classList.length.should.equal(2);
    formText.classList.contains('form-text').should.be.true;
    formText.classList.contains('my-form-text').should.be.true;
    formText.innerText.should.equal('Help content');
  });

  it('Should have small as default component', () => {
    const { getByTestId } = render(<FormText data-testid="foo" />);

    const formText = getByTestId('foo');
    formText.tagName.toLowerCase().should.equal('small');
  });

  it('Should have "form-text" & "text-muted" class', () => {
    const { getByTestId } = render(<FormText data-testid="foo" muted />);

    const formText = getByTestId('foo');
    formText.classList.length.should.equal(2);
    formText.classList.contains('form-text').should.be.true;
    formText.classList.contains('text-muted').should.be.true;
  });
});
