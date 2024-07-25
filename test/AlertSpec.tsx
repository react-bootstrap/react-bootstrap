import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    render(
      <Alert data-testid="test-alert">
        <strong>Message</strong>
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').children.length).toEqual(1);
    expect(
      screen.getByTestId('test-alert').children[0].tagName.toLowerCase(),
    ).toEqual('strong');
  });

  it('Should have dismissible style', () => {
    render(
      <Alert data-testid="test-alert" dismissible>
        <strong>Message</strong>
      </Alert>,
    );
    expect(
      screen.getByTestId('test-alert').classList.contains('alert-dismissible'),
    ).toEqual(true);
  });

  it('Should call onClose callback on dismiss click', () => {
    const onCloseSpy = vi.fn();
    render(
      <Alert dismissible data-testid="test-alert" onClose={onCloseSpy}>
        Message
      </Alert>,
    );
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('Should default to variant="primary"', () => {
    render(<Alert data-testid="test-alert">Message</Alert>);
    expect(
      screen.getByTestId('test-alert').classList.contains('alert-primary'),
    ).toEqual(true);
  });

  it('Should use variant class', () => {
    render(
      <Alert variant="danger" data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(
      screen.getByTestId('test-alert').classList.contains('alert-danger'),
    ).toEqual(true);
  });

  it('Should not have variant class when variant=null', () => {
    render(
      <Alert variant={null as any} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(
      screen.getByTestId('test-alert').classList.contains('alert-primary'),
    ).toEqual(false);
  });

  it('should forward refs to the alert', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Alert ref={ref} data-testid="test-alert">
        message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').tagName.toLowerCase()).toEqual(
      'div',
    );
  });

  it('should not have fade class when transition=false', () => {
    render(
      <Alert transition={false} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList.contains('fade')).toEqual(
      false,
    );
  });

  it('should spread props to alert when transition=false', () => {
    const alertId = 'alert-id';
    render(
      <Alert transition={false} id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').getAttribute('id')).toEqual(
      alertId,
    );
  });

  it('should spread props to alert when transition=true', () => {
    const alertId = 'alert-id';
    render(
      <Alert transition id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').getAttribute('id')).toEqual(
      alertId,
    );
  });

  it('should use Fade when transition=true', () => {
    render(
      <Alert variant="danger" transition data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList.contains('fade')).toEqual(
      true,
    );
  });

  it('should render null when transition and show are false', () => {
    const { container } = render(
      <Alert
        variant="danger"
        transition={false}
        show={false}
        data-testid="test-alert"
      >
        Message
      </Alert>,
    );
    expect(container.innerHTML).toEqual('');
  });

  it('should render close button variant', () => {
    render(
      <Alert dismissible closeVariant="white">
        Message
      </Alert>,
    );
    expect(
      screen
        .getByLabelText('Close alert')
        .classList.contains('btn-close-white'),
    ).toEqual(true);
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      render(<Alert data-testid="test-alert">Message</Alert>);
      expect(screen.getByTestId('test-alert').getAttribute('role')).toEqual(
        'alert',
      );
    });
  });

  describe('Alert alert-heading', () => {
    it('Should have alert-heading', () => {
      render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      expect(
        screen.getByTestId('test-alert').classList.contains('alert-heading'),
      ).toEqual(true);
    });

    it('Should have div styled as an h4 by default', () => {
      render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      expect(screen.getByTestId('test-alert').classList.contains('h4')).toEqual(
        true,
      );
    });

    it('Should support Heading as as prop', () => {
      render(
        <Alert>
          <Alert.Heading as="h1" data-testid="test-alert">
            Well done
          </Alert.Heading>
          Message
        </Alert>,
      );
      expect(screen.getByTestId('test-alert').tagName.toLowerCase()).toEqual(
        'h1',
      );
    });
  });
});
