import { render } from '@testing-library/react';

import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(
      <Badge bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    badge.innerText.should.equal('Message');
    badge.classList.contains('badge').should.be.true;
    badge.classList.contains('bg-primary').should.be.true;
    badge.classList.contains('rounded-pill').should.be.true;
  });

  it('should support custom `as`', () => {
    const { getByTestId } = render(
      <Badge as="a" href="#" bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    badge.tagName.toLowerCase().should.equal('a');
    badge.getAttribute('href')!.should.equal('#');
  });

  it('Should default to bg="primary"', () => {
    const { getByTestId } = render(<Badge data-testid="test">Message</Badge>);

    const badge = getByTestId('test');
    badge.classList.contains('bg-primary').should.be.true;
  });

  it('Should use bg class', () => {
    const { getByTestId } = render(
      <Badge bg="danger" data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    badge.classList.contains('bg-danger').should.be.true;
  });

  it('Should not have bg class when bg=null', () => {
    const { getByTestId } = render(
      <Badge bg={null as any} data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    badge.classList.contains('bg-primary').should.be.false;
  });
});
