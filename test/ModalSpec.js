import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Modal from '../src/Modal';
import { shouldWarn } from './helpers';

describe('Modal', function () {

  it('Should render the modal content', function() {
    let noOp = function () {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should add modal-open class to the modal container while open', function(done) {

    let Container = React.createClass({
      getInitialState() {
        return { modalOpen: true };
      },
      handleCloseModal() {
        this.setState({ modalOpen: false });
      },
      render() {
        return (
          <div>
            <Modal show={this.state.modalOpen} onHide={this.handleCloseModal} container={this}>
              <strong>Message</strong>
            </Modal>
          </div>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(
        <Container />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\modal-open\b/));

    let backdrop = React.findDOMNode(instance).getElementsByClassName('modal-backdrop')[0];

    ReactTestUtils.Simulate.click(backdrop);
    setTimeout(function(){
      assert.equal(React.findDOMNode(instance).className.length, 0);
      done();
    }, 0);

  });

  it('Should close the modal when the backdrop is clicked', function (done) {
    let doneOp = function () { done(); };
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    let backdrop = React.findDOMNode(instance).getElementsByClassName('modal-backdrop')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should close the modal when the modal background is clicked', function (done) {
    let doneOp = function () { done(); };
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    let backdrop = React.findDOMNode(instance).getElementsByClassName('modal')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should pass bsSize to the dialog', function () {
    let noOp = function () {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal bsSize='small' onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    let dialog = React.findDOMNode(instance).getElementsByClassName('modal-dialog')[0];
    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  it('Should pass dialogClassName to the dialog', function () {
    let noOp = function () {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    let dialog = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'modal-dialog');
    assert.match(dialog.props.className, /\btestCss\b/);
  });

  describe('Focused state', function () {
    let focusableContainer = null;
    beforeEach(function () {
      focusableContainer = document.createElement('div');
      focusableContainer.tabIndex = 0;
      document.body.appendChild(focusableContainer);
      focusableContainer.focus();
    });

    afterEach(function () {
      React.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('Should focus on the Modal when it is opened', function (done) {
      document.activeElement.should.equal(focusableContainer);

      let doneOp = function () {
        // focus should be back on the previous element when modal closed
        setTimeout(function () {
          document.activeElement.should.equal(focusableContainer);
          done();
        }, 0);
      };

      let Container = React.createClass({
        getInitialState() {
          return {modalOpen: true};
        },
        handleCloseModal() {
          this.setState({modalOpen: false});
          doneOp();
        },
        render() {
          if (this.state.modalOpen) {
            return (
              <Modal onHide={this.handleCloseModal} container={this}>
                <strong>Message</strong>
              </Modal>
            );
          } else {
            return <span/>;
          }
        }
      });

      let instance = React.render(<Container />, focusableContainer);

      setTimeout(function () {
        // modal should be focused when opened
        let modal = React.findDOMNode(instance).getElementsByClassName('modal')[0];
        document.activeElement.should.equal(modal);

        // close the modal
        let backdrop = React.findDOMNode(instance).getElementsByClassName('modal-backdrop')[0];
        ReactTestUtils.Simulate.click(backdrop);
      }, 0);
    });

    it('Should not focus on the Modal when autoFocus is false', function (done) {

      document.activeElement.should.equal(focusableContainer);

      let Container = React.createClass({
        getInitialState() {
          return {modalOpen: true};
        },
        render() {
          if (this.state.modalOpen) {
            return (

              <Modal autoFocus={false} onHide={()=>{}} container={this}>
                <strong>Message</strong>
              </Modal>
            );
          } else {
            return <span/>;
          }
        }
      });

      React.render(<Container />, focusableContainer);

      setTimeout(function () {
        // modal should be focused when opened
        document.activeElement.should.equal(focusableContainer);
        done();
      }, 0);
    });

    it('Should not focus Modal when child has focus', function (done) {

      document.activeElement.should.equal(focusableContainer);

      let Container = React.createClass({
        getInitialState() {
          return {modalOpen: true};
        },
        render() {
          if (this.state.modalOpen) {
            return (
              <Modal onRequestHide={()=>{}} container={this}>
                <input autoFocus />
              </Modal>
            );
          } else {
            return <span/>;
          }
        }
      });

      let instance = React.render(<Container />, focusableContainer);

      setTimeout(function () {
        let input = React.findDOMNode(
          ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input'));

        document.activeElement.should.equal(input);
        done();
      }, 0);
    });
  });


  describe('deprecations', function(){
    it('Should render the modal header and title', function() {
      let instance = ReactTestUtils.renderIntoDocument(
        <Modal title='hello' onHide={()=>{}}>
          <strong>Message</strong>
        </Modal>
      );

      (()=> {
        ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        ReactTestUtils.findRenderedComponentWithType(instance, Modal.Header);
        ReactTestUtils.findRenderedComponentWithType(instance, Modal.Title);
      }).should.not.throw();

      shouldWarn(
        'Specifying `closeButton` or `title` Modal props is deprecated');
    });

    it('Should warn about onRequestHide', function() {
      ReactTestUtils.renderIntoDocument(
        <Modal onRequestHide={()=>{}}>
          <Modal.Header closeButton/>
        </Modal>
      );

      shouldWarn('The Modal prop `onRequestHide` is deprecated');
    });
  });
});
