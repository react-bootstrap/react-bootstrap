import { render } from '@testing-library/react';
import * as React from 'react';
import FormCheck from '../src/FormCheck';
import Switch from '../src/Switch';

describe('<FormCheck>', () => {
  it('should render correctly', () => {
    const { getByTestId, container } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        defaultChecked
        label="My label"
        className="my-checkbox"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');

    element.parentElement!.classList.length.should.equal(2);
    element.parentElement!.classList.contains('form-check').should.be.true;
    element.parentElement!.classList.contains('my-checkbox').should.be.true;

    element.id.should.equal('foo');
    element.classList.length.should.equal(1);
    element.classList.contains('form-check-input').should.be.true;
    element.getAttribute('name')!.should.equal('foo');
    element.getAttribute('type')!.should.equal('checkbox');
    element.getAttribute('value')!.should.equal('foo');
    element.getAttribute('checked')!.should.equal('');

    const labels = container.getElementsByTagName('label');
    labels.length.should.equal(1);
    const label = labels[0];
    label.classList.length.should.equal(1);
    label.classList.contains('form-check-label').should.be.true;
    label.getAttribute('for')!.should.equal('foo');
    label.innerText.should.equal('My label');
  });

  it('should render radio correctly', () => {
    const { getByTestId, container } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        type="radio"
        defaultChecked
        className="my-radio"
        label="My label"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');

    element.parentElement!.classList.length.should.equal(2);
    element.parentElement!.classList.contains('form-check').should.be.true;
    element.parentElement!.classList.contains('my-radio').should.be.true;

    element.id.should.equal('foo');
    element.classList.length.should.equal(1);
    element.classList.contains('form-check-input').should.be.true;
    element.getAttribute('name')!.should.equal('foo');
    element.getAttribute('type')!.should.equal('radio');
    element.getAttribute('value')!.should.equal('foo');
    element.getAttribute('checked')!.should.equal('');

    const labels = container.getElementsByTagName('label');
    labels.length.should.equal(1);
    const label = labels[0];
    label.classList.length.should.equal(1);
    label.classList.contains('form-check-label').should.be.true;
    label.getAttribute('for')!.should.equal('foo');
    label.innerText.should.equal('My label');
  });

  it('should support inline', () => {
    const {
      container: { firstElementChild: element },
    } = render(<FormCheck inline label="My label" />);

    element!.classList.length.should.equal(2);
    element!.classList.contains('form-check-inline').should.be.true;
  });

  it('should support in reverse', () => {
    const {
      container: { firstElementChild: element },
    } = render(<FormCheck reverse label="My label" />);

    element!.classList.length.should.equal(2);
    element!.classList.contains('form-check-reverse').should.be.true;
  });

  it('should support isValid', () => {
    const { getByTestId } = render(<FormCheck isValid data-testid="test-id" />);

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('is-valid').should.be.true;
  });

  it('should support isInvalid', () => {
    const { getByTestId } = render(
      <FormCheck isInvalid data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('is-invalid').should.be.true;
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormCheck
            ref={(ref) => {
              input = ref;
            }}
          />
        );
      }
    }

    render(<Container />);
    input.tagName.toLowerCase().should.equal('input');
  });

  it('should not render bsPrefix if no label is specified', () => {
    const { container } = render(
      <FormCheck id="foo" name="foo" value="foo" type="radio" />,
    );

    container.getElementsByClassName('form-check').length.should.equal(0);
  });

  it('should support type switch', () => {
    const { getByTestId, container } = render(
      <FormCheck
        type="switch"
        label="My label"
        id="switch-id"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');

    element.parentElement!.classList.length.should.equal(2);
    element.parentElement!.classList.contains('form-check').should.be.true;
    element.parentElement!.classList.contains('form-switch').should.be.true;

    element.id.should.equal('switch-id');
    element.classList.length.should.equal(1);
    element.classList.contains('form-check-input').should.be.true;
    element.id.should.equal('switch-id');
    element.getAttribute('type')!.should.equal('checkbox');

    const labels = container.getElementsByTagName('label');
    labels.length.should.equal(1);
    const label = labels[0];
    label.classList.length.should.equal(1);
    label.classList.contains('form-check-label').should.be.true;
    label.getAttribute('for')!.should.equal('switch-id');
    label.innerText.should.equal('My label');
  });

  it('should support Switch', () => {
    const { getByTestId, container } = render(
      <Switch label="My label" id="switch-id" data-testid="test-id" />,
    );

    const element = getByTestId('test-id');

    element.parentElement!.classList.length.should.equal(2);
    element.parentElement!.classList.contains('form-check').should.be.true;
    element.parentElement!.classList.contains('form-switch').should.be.true;

    element.id.should.equal('switch-id');
    element.classList.length.should.equal(1);
    element.classList.contains('form-check-input').should.be.true;
    element.id.should.equal('switch-id');
    element.getAttribute('type')!.should.equal('checkbox');

    const labels = container.getElementsByTagName('label');
    labels.length.should.equal(1);
    const label = labels[0];
    label.classList.length.should.equal(1);
    label.classList.contains('form-check-label').should.be.true;
    label.getAttribute('for')!.should.equal('switch-id');
    label.innerText.should.equal('My label');
  });

  it('should support "as"', () => {
    const Surrogate = ({ className = '', ...rest }) => (
      <input className={`extraClass ${className}'`} {...rest} />
    );
    const { getByTestId } = render(
      <FormCheck as={Surrogate} data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('extraClass').should.be.true;
  });

  it('Should render valid feedback properly', () => {
    const { container } = render(
      <FormCheck label="My label" feedbackType="valid" feedback="test" />,
    );

    const feedbacks = container.getElementsByClassName('valid-feedback');
    feedbacks.length.should.equal(1);
    feedbacks[0].textContent!.should.equal('test');
  });

  it('Should render invalid feedback properly', () => {
    const { container } = render(
      <FormCheck label="My label" feedbackType="invalid" feedback="test" />,
    );

    const feedbacks = container.getElementsByClassName('invalid-feedback');
    feedbacks.length.should.equal(1);
    feedbacks[0].textContent!.should.equal('test');
  });

  it('Should render valid feedback tooltip properly', () => {
    const { container } = render(
      <FormCheck
        label="My label"
        feedbackType="valid"
        feedback="test"
        feedbackTooltip
      />,
    );

    const feedbacks = container.getElementsByClassName('valid-tooltip');
    feedbacks.length.should.equal(1);
    feedbacks[0].textContent!.should.equal('test');
  });

  it('Should render invalid feedback tooltip properly', () => {
    const { container } = render(
      <FormCheck
        label="My label"
        feedbackType="invalid"
        feedback="test"
        feedbackTooltip
      />,
    );

    const feedbacks = container.getElementsByClassName('invalid-tooltip');
    feedbacks.length.should.equal(1);
    feedbacks[0].textContent!.should.equal('test');
  });
});
