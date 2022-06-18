import * as React from 'react';
import { render } from '@testing-library/react';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormControl>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormControl
        type="text"
        id="foo"
        name="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');
    element.tagName.toLowerCase().should.equal('input');
    element.id.should.equal('foo');
    element.classList.length.should.equal(2);
    element.classList.contains('form-control').should.be.true;
    element.classList.contains('my-control').should.be.true;
    element.getAttribute('name')!.should.equal('bar');
    element.getAttribute('type')!.should.equal('text');
  });

  it('should support textarea', () => {
    const { getByTestId } = render(
      <FormControl as="textarea" data-testid="test-id" />,
    );

    getByTestId('test-id').tagName.toLowerCase().should.equal('textarea');
  });

  it('should support plaintext inputs', () => {
    const { getByTestId } = render(
      <FormControl plaintext data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(1);
    element.classList.contains('form-control-plaintext').should.be.true;
  });

  it('should support type=color', () => {
    const { getByTestId } = render(
      <FormControl type="color" data-testid="test-id" />,
    );

    getByTestId('test-id').getAttribute('type')!.should.equal('color');
  });

  it('should use controlId for id', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" data-testid="test-id" />
      </FormGroup>,
    );

    getByTestId('test-id').id.should.equal('foo');
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored');

    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" data-testid="test-id" />
      </FormGroup>,
    );

    getByTestId('test-id').id.should.equal('bar');
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormControl
              type="text"
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    input.tagName.toLowerCase().should.to.equal('input');
  });

  it('should properly display size of FormControl', () => {
    const { getByTestId } = render(
      <FormControl type="text" size="lg" data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('form-control-lg').should.be.true;
  });

  it('should properly display html size of FormControl', () => {
    const { getByTestId } = render(
      <FormControl type="text" htmlSize={42} data-testid="test-id" />,
    );

    getByTestId('test-id').getAttribute('size')!.should.equal('42');
  });

  it('Should have input as default component', () => {
    const { getByTestId } = render(<FormControl data-testid="test-id" />);

    getByTestId('test-id').tagName.toLowerCase().should.equal('input');
  });

  it('should support numbers as values', () => {
    const { getByTestId } = render(
      <FormControl
        value={10}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    getByTestId('test-id').getAttribute('value')!.should.equal('10');
  });

  it('should support an array of strings as values', () => {
    const { getByTestId } = render(
      <FormControl
        value={['hello', 'world']}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    getByTestId('test-id').getAttribute('value')!.should.equal('hello,world');
  });
});
