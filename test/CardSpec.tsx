import { render } from '@testing-library/react';

import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', () => {
    const { getByText } = render(<Card>Card</Card>);
    getByText('Card').tagName.toLowerCase().should.equal('div');
    getByText('Card').classList.contains('card').should.be.true;
  });

  it('should have additional classes', () => {
    const { getByText } = render(<Card className="custom-class">Card</Card>);
    getByText('Card').classList.contains('custom-class').should.be.true;
  });

  it('accepts a bg prop', () => {
    const { getByText } = render(<Card bg="primary">Card</Card>);
    getByText('Card').classList.contains('bg-primary').should.be.true;
  });

  it('accepts a text prop', () => {
    const { getByText } = render(<Card text="success">Card</Card>);
    getByText('Card').classList.contains('text-success').should.be.true;
  });

  it('accepts a border prop', () => {
    const { getByText } = render(<Card border="danger">Card</Card>);
    getByText('Card').classList.contains('border-danger').should.be.true;
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Card data-testid="test-card">
        <p>hello</p>
      </Card>,
    );
    getByTestId('test-card').children.length.should.equal(1);
    getByTestId('test-card')
      .children[0].tagName.toLowerCase()
      .should.equal('p');
  });

  it('accepts as prop', () => {
    const { getByText } = render(<Card as="section">body</Card>);
    getByText('body').tagName.toLowerCase().should.equal('section');
  });

  it('allows for the body shorthand', () => {
    const { getByText } = render(<Card body>test</Card>);
    getByText('test').classList.contains('card-body').should.be.true;
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(<Card data-testid="default-test" />);
    getByTestId('default-test').tagName.toLowerCase().should.equal('div');
  });
});
