import * as React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

import { shouldWarn } from './helpers';

describe('<FormLabel>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormLabel
        id="foo"
        htmlFor="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');
    element.tagName.toLowerCase().should.equal('label');
    element.classList.length.should.equal(2);
    element.classList.contains('form-label').should.be.true;
    element.classList.contains('my-control').should.be.true;
    element.id.should.equal('foo');
    element.getAttribute('for')!.should.not.null;
  });

  it('should use controlId for htmlFor', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.getAttribute('for')!.should.equal('foo');
  });

  it('should render as a Col', () => {
    const { getByTestId } = render(
      <FormLabel column sm={4} data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(3);
    element.classList.contains('form-label').should.be.true;
    element.classList.contains('col-form-label').should.be.true;
    element.classList.contains('col-sm-4').should.be.true;
  });

  it('should use controlId for htmlFor when render as Col', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel column sm={4} data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(3);
    element.classList.contains('form-label').should.be.true;
    element.classList.contains('col-form-label').should.be.true;
    element.classList.contains('col-sm-4').should.be.true;
    element.getAttribute('for')!.should.equal('foo');
  });

  it('should respect visuallyHidden', () => {
    const { getByTestId } = render(
      <FormLabel visuallyHidden data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('visually-hidden').should.be.true;
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel htmlFor="bar" data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.getAttribute('for')!.should.equal('bar');
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    input.tagName.toLowerCase().should.to.equal('label');
  });

  it('should support ref forwarding when rendered as a Col', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              column
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    input.tagName.toLowerCase().should.to.equal('label');
  });

  it('accepts as prop', () => {
    const { getByTestId } = render(
      <FormLabel as="legend" data-testid="test-id">
        body
      </FormLabel>,
    );

    getByTestId('test-id').tagName.toLowerCase().should.equal('legend');
  });

  it('should properly size itself when rendered as a Col', () => {
    const { getByTestId } = render(
      <div>
        <FormLabel column="sm" data-testid="test-1">
          Label
        </FormLabel>
        <FormLabel column data-testid="test-2">
          Label
        </FormLabel>
        <FormLabel column="lg" data-testid="test-3">
          Label
        </FormLabel>
      </div>,
    );

    getByTestId('test-1').classList.contains('col-form-label-sm').should.be
      .true;
    getByTestId('test-2').classList.contains('col-form-label').should.be.true;
    getByTestId('test-3').classList.contains('col-form-label-lg').should.be
      .true;
  });
});
