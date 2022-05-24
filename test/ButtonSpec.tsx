import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';

import Button from '../src/Button';

// Simplified react-router@6/Link
// https://github.com/remix-run/react-router/blob/09e90ec885d95b4a35f0eebcf4bac6f796ce9878/packages/react-router-dom/index.tsx#L251-L289
interface CustomLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, to, ...rest }, ref) => (
    <a {...rest} href={to} ref={ref}>
      {children}
    </a>
  ),
);

describe('<Button>', () => {
  it('Should output a button', () => {
    const { getByRole } = render(<Button>Title</Button>);

    getByRole('button').should.exist;
  });

  it('Should have type=button by default', () => {
    const { getByRole } = render(<Button>Title</Button>);

    expect(getByRole('button').getAttribute('type')).to.be.equal('button');
  });

  it('Should show the type if passed one', () => {
    const { getByRole } = render(<Button type="submit">Title</Button>);

    expect(getByRole('button').getAttribute('type')).to.be.equal('submit');
  });

  it('Should show the type if explicitly passed in when as="element" is used', () => {
    const { getByTestId } = render(
      <Button as="div" type="submit" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).to.be.equal('submit');
  });

  it('Should show the type if explicitly passed in when as={Component} is used', () => {
    const { getByTestId } = render(
      <Button as={CustomLink} to="/" type="submit" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).to.be.equal('submit');
  });

  it('Should not have default type=button when as="element" is used', () => {
    const { getByTestId } = render(
      <Button as="div" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).to.be.null;
  });

  it('Should not have default type=button when as={Component} is used', () => {
    const { getByTestId } = render(
      <Button as={CustomLink} to="/" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).to.be.null;
  });

  it('should forward refs to the button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <div>
        <Button ref={ref}>Yo</Button>
      </div>,
    );

    expect(ref.current?.tagName).to.be.equal('BUTTON');
  });

  it('should forward refs to the link', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <div>
        <Button
          ref={
            ref as unknown as React.Ref<HTMLButtonElement> /* TODO: inferred <a> ref type is wrong */
          }
          href="a"
        >
          Yo
        </Button>
      </div>,
    );

    expect(ref.current?.tagName).to.be.equal('A');

    render(
      <div>
        <Button ref={ref} as={CustomLink} to="/">
          Yo
        </Button>
      </div>,
    );

    expect(ref.current?.tagName).to.be.equal('A');
  });

  it('Should output an anchor if called with a href', () => {
    const href = '/url';

    const { getByRole } = render(<Button href={href}>Title</Button>);

    expect(getByRole('button').getAttribute('href')).to.be.equal(href);
  });

  it('Should pass through href from as={Component}', () => {
    const href = '/url';

    const { getByRole } = render(
      <Button as={CustomLink} to={href}>
        Title
      </Button>,
    );

    expect(getByRole('button').getAttribute('href')).to.be.equal(href);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();

    const { getByRole } = render(<Button onClick={onClick}>Title</Button>);

    fireEvent.click(getByRole('button'));

    onClick.should.have.been.calledOnce;
  });

  it('Should call onClick callback with as={Component}', () => {
    const onClick = sinon.spy();

    const { getByRole } = render(
      <Button as={CustomLink} to="/" onClick={onClick}>
        Title
      </Button>,
    );

    fireEvent.click(getByRole('button'));

    onClick.should.have.been.calledOnce;
  });

  it('Should be disabled', () => {
    const { getByRole } = render(<Button disabled>Title</Button>);

    getByRole('button').matches('[disabled]').should.be.true;
  });

  it('Should be disabled link', () => {
    const { getByRole } = render(
      <Button disabled href="#">
        Title
      </Button>,
    );

    getByRole('button').classList.contains('disabled').should.be.true;
  });

  it('Should be disabled with as={CustomLink}', () => {
    const { getByRole } = render(
      <Button disabled as={CustomLink} to="#">
        Title
      </Button>,
    );

    getByRole('button').classList.contains('disabled').should.be.true;
  });

  it('Should apply variant class', () => {
    const { getByRole } = render(<Button variant="danger">Title</Button>);

    getByRole('button').classList.contains('btn-danger').should.be.true;
  });

  it('Should have size class', () => {
    const { getByRole } = render(<Button size="lg">Title</Button>);

    getByRole('button').classList.contains('btn-lg').should.be.true;
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const { getByRole } = render(
      <Button className="bob" variant="danger">
        Title
      </Button>,
    );

    const button = getByRole('button');
    button.classList.contains('bob').should.be.true;
    button.classList.contains('btn-danger').should.be.true;
  });

  it('Should default to variant="primary"', () => {
    const { getByRole } = render(<Button>Title</Button>);

    getByRole('button').classList.contains('btn-primary').should.be.true;
  });

  it('Should remove default variant', () => {
    const { getByRole } = render(<Button variant={null as any}>Title</Button>);

    getByRole('button').classList.contains('btn-primary').should.be.false;
  });

  it('Should not output null variant', () => {
    const { getByRole } = render(<Button variant="">Title</Button>);

    getByRole('button').classList.contains('btn-null').should.be.false;
  });

  it('Should not output empty variant', () => {
    const { getByRole } = render(<Button variant="">Title</Button>);

    getByRole('button').classList.contains('btn-').should.be.false;
  });

  it('Should be active', () => {
    const { getByRole } = render(<Button active>Title</Button>);

    getByRole('button').classList.contains('active').should.be.true;
  });

  it('Should allow a custom prefix', () => {
    const { getByRole } = render(
      <Button bsPrefix="my-btn" variant="danger">
        Title
      </Button>,
    );

    const button = getByRole('button');
    button.classList.contains('my-btn').should.be.true;
    button.classList.contains('my-btn-danger').should.be.true;
  });
});
