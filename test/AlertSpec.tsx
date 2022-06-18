import * as React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    const { getByTestId } = render(
      <Alert data-testid="test-alert">
        <strong>Message</strong>
      </Alert>,
    );
    getByTestId('test-alert').children.length.should.equal(1);
    getByTestId('test-alert')
      .children[0].tagName.toLowerCase()
      .should.equal('strong');
  });

  it('Should have dismissible style', () => {
    const { getByTestId } = render(
      <Alert data-testid="test-alert" dismissible>
        <strong>Message</strong>
      </Alert>,
    );
    getByTestId('test-alert').classList.contains('alert-dismissible').should.be
      .true;
  });

  it('Should call onClose callback on dismiss click', () => {
    const onCloseSpy = sinon.spy();
    const { getByLabelText } = render(
      <Alert dismissible data-testid="test-alert" onClose={onCloseSpy}>
        Message
      </Alert>,
    );
    fireEvent.click(getByLabelText('Close alert'));
    onCloseSpy.should.be.calledOnce;
  });

  it('Should default to variant="primary"', () => {
    const { getByTestId } = render(
      <Alert data-testid="test-alert">Message</Alert>,
    );
    getByTestId('test-alert').classList.contains('alert-primary').should.be
      .true;
  });

  it('Should use variant class', () => {
    const { getByTestId } = render(
      <Alert variant="danger" data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').classList.contains('alert-danger').should.be.true;
  });

  it('Should not have variant class when variant=null', () => {
    const { getByTestId } = render(
      <Alert variant={null as any} data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').classList.contains('alert-primary').should.not.be
      .true;
  });

  it('should forward refs to the alert', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Alert ref={ref} data-testid="test-alert">
        message
      </Alert>,
    );
    getByTestId('test-alert').tagName.toLowerCase().should.equal('div');
  });

  it('should not have fade class when transition=false', () => {
    const { getByTestId } = render(
      <Alert transition={false} data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').classList.contains('fade').should.not.be.true;
  });

  it('should spread props to alert when transition=false', () => {
    const alertId = 'alert-id';
    const { getByTestId } = render(
      <Alert transition={false} id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').getAttribute('id')!.should.equal(alertId);
  });

  it('should spread props to alert when transition=true', () => {
    const alertId = 'alert-id';
    const { getByTestId } = render(
      <Alert transition id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').getAttribute('id')!.should.equal(alertId);
  });

  it('should use Fade when transition=true', () => {
    const { getByTestId } = render(
      <Alert variant="danger" transition data-testid="test-alert">
        Message
      </Alert>,
    );
    getByTestId('test-alert').classList.contains('fade').should.be.true;
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
    expect(container.innerHTML).equals('');
  });

  it('should render close button variant', () => {
    const { getByLabelText } = render(
      <Alert dismissible closeVariant="white">
        Message
      </Alert>,
    );
    getByLabelText('Close alert').classList.contains('btn-close-white').should
      .be.true;
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      const { getByTestId } = render(
        <Alert data-testid="test-alert">Message</Alert>,
      );
      getByTestId('test-alert').getAttribute('role')!.should.equal('alert');
    });
  });

  describe('Alert alert-heading', () => {
    it('Should have alert-heading', () => {
      const { getByTestId } = render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      getByTestId('test-alert').classList.contains('alert-heading').should.be
        .true;
    });

    it('Should have div styled as an h4 by default', () => {
      const { getByTestId } = render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      getByTestId('test-alert').classList.contains('h4').should.be.true;
    });

    it('Should support Heading as as prop', () => {
      const { getByTestId } = render(
        <Alert>
          <Alert.Heading as="h1" data-testid="test-alert">
            Well done
          </Alert.Heading>
          Message
        </Alert>,
      );
      getByTestId('test-alert').tagName.toLowerCase().should.equal('h1');
    });
  });
});
