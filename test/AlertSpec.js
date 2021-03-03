import * as React from 'react';
import { mount } from 'enzyme';

import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    mount(
      <Alert>
        <strong>Message</strong>
      </Alert>,
    ).assertSingle('.alert > strong');
  });

  it('Should have dismissible style', () => {
    mount(<Alert dismissible>Message</Alert>).assertSingle(
      '.alert-dismissible',
    );
  });

  it('Should call onClose callback on dismiss click', (done) => {
    let doneOp = () => {
      done();
    };
    mount(
      <Alert dismissible onClose={doneOp}>
        Message
      </Alert>,
    )
      .find('CloseButton')
      .simulate('click');
  });

  it('Should have use variant class', () => {
    mount(<Alert variant="danger">Message</Alert>).assertSingle(
      '.alert-danger',
    );
  });

  it('should forward refs to the alert', () => {
    const ref = React.createRef();
    mount(<Alert ref={ref}>Yo</Alert>);
    ref.current.tagName.should.equal('DIV');
  });

  it('should not have fade class when transition=false', () => {
    const wrapper = mount(<Alert transition={false}>Message</Alert>);
    expect(wrapper.find('.fade').length).to.equal(0);
  });

  it('should spread props to alert when transition=false', () => {
    const alertId = 'alert-id';
    const wrapper = mount(
      <Alert transition={false} id={alertId}>
        Message
      </Alert>,
    );
    expect(wrapper.getDOMNode().getAttribute('id')).to.equal(alertId);
  });

  it('should spread props to alert when transition=true', () => {
    const alertId = 'alert-id';
    const wrapper = mount(
      <Alert transition id={alertId}>
        Message
      </Alert>,
    );
    expect(wrapper.getDOMNode().getAttribute('id')).to.equal(alertId);
  });

  it('should use Fade when transition=true', () => {
    mount(
      <Alert variant="danger" transition>
        Message
      </Alert>,
    ).assertSingle('.fade');
  });

  it('should render null when transition and show are false', () => {
    const wrapper = mount(
      <Alert transition={false} show={false}>
        Message
      </Alert>,
    );
    expect(wrapper.isEmptyRender()).to.be.true;
  });

  it('should render close button variant', () => {
    const wrapper = mount(
      <Alert dismissible closeVariant="white">
        Message
      </Alert>,
    );
    expect(wrapper.find('CloseButton').props()).to.have.property(
      'variant',
      'white',
    );
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      mount(<Alert>Message</Alert>).assertSingle('[role="alert"]');
    });
  });

  describe('Alert alert-heading', () => {
    it('Should have alert-heading', () => {
      mount(
        <Alert>
          <Alert.Heading>Well done</Alert.Heading>
          Message
        </Alert>,
      ).assertSingle('div.alert-heading');
    });

    it('Should have div styled as an h4 by default', () => {
      mount(
        <Alert>
          <Alert.Heading>Well done</Alert.Heading>
          Message
        </Alert>,
      ).assertSingle('.h4');
    });

    it('Should support Heading as as prop', () => {
      mount(
        <Alert>
          <Alert.Heading as="h1">Well done</Alert.Heading>
          Message
        </Alert>,
      ).assertSingle('h1');
    });
  });
});
