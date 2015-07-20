import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { render } from './helpers';
import Transition, {UNMOUNTED, EXITED, ENTERING, ENTERED, EXITING} from
  '../src/Transition';

describe('Transition', function () {
  it('should not transition on mount', function(){
    let instance = render(
          <Transition in onEnter={()=> { throw new Error('should not Enter'); }}>
            <div></div>
          </Transition>
        );

    expect(instance.state.status).to.equal(ENTERED);
  });

  it('should transition on mount with transitionAppear', done =>{
    let instance = ReactTestUtils.renderIntoDocument(
          <Transition in
            transitionAppear
            onEnter={()=> done()}
          >
            <div></div>
          </Transition>
        );

    expect(instance.state.status).to.equal(EXITED);
  });

  describe('entering', ()=> {
    let instance;

    beforeEach(function(){
      instance = render(
        <Transition
          duration={10}
          enteredClassName='test-enter'
          enteringClassName='test-entering'
        >
          <div/>
        </Transition>
      );
    });

    it('should fire callbacks', done => {
      let onEnter = sinon.spy();
      let onEntering = sinon.spy();

      expect(instance.state.status).to.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter,

        onEntering,

        onEntered(){
          expect(onEnter.calledOnce).to.be.ok;
          expect(onEntering.calledOnce).to.be.ok;
          expect(onEnter.calledBefore(onEntering)).to.be.ok;
          done();
        }
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      expect(instance.state.status).to.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter(){
          count++;
          expect(instance.state.status).to.equal(EXITED);
        },

        onEntering(){
          count++;
          expect(instance.state.status).to.equal(ENTERING);
        },

        onEntered(){
          expect(instance.state.status).to.equal(ENTERED);
          expect(count).to.equal(2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      expect(instance.state.status).to.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter(node){
          count++;
          expect(node.className).to.equal('');
        },

        onEntering(node){
          count++;
          expect(node.className).to.equal('test-entering');
        },

        onEntered(node){
          expect(node.className).to.equal('test-enter');
          expect(count).to.equal(2);
          done();
        }
      });
    });
  });

  describe('exiting', ()=> {
    let instance;

    beforeEach(function(){
      instance = render(
        <Transition
          in={true}
          duration={10}
          exitedClassName='test-exit'
          exitingClassName='test-exiting'
        >
          <div/>
        </Transition>
      );
    });

    it('should fire callbacks', done => {
      let onExit = sinon.spy();
      let onExiting = sinon.spy();

      expect(instance.state.status).to.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit,

        onExiting,

        onExited(){
          expect(onExit.calledOnce).to.be.ok;
          expect(onExiting.calledOnce).to.be.ok;
          expect(onExit.calledBefore(onExiting)).to.be.ok;
          done();
        }
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      expect(instance.state.status).to.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit(){
          count++;
          expect(instance.state.status).to.equal(ENTERED);
        },

        onExiting(){
          count++;
          expect(instance.state.status).to.equal(EXITING);
        },

        onExited(){
          expect(instance.state.status).to.equal(EXITED);
          expect(count).to.equal(2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      expect(instance.state.status).to.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit(node){
          count++;
          expect(node.className).to.equal('');
        },

        onExiting(node){
          count++;
          expect(node.className).to.equal('test-exiting');
        },

        onExited(node){
          expect(node.className).to.equal('test-exit');
          expect(count).to.equal(2);
          done();
        }
      });
    });
  });

  describe('unmountOnExit', () => {
    class UnmountTransition extends React.Component {
      constructor(props) {
        super(props);

        this.state = {in: props.initialIn};
      }

      render() {
        return (
          <Transition
            ref="transition"
            unmountOnExit
            in={this.state.in}
            duration={10}
            {...this.props}
          >
            <div />
          </Transition>
        );
      }

      getStatus() {
        return this.refs.transition.state.status;
      }
    }

    it('should mount when entering', done => {
      const instance = render(
        <UnmountTransition
          initialIn={false}

          onEnter={() => {
            expect(instance.getStatus()).to.equal(EXITED);
            expect(React.findDOMNode(instance)).to.exist;

            done();
          }}
        />
      );

      expect(instance.getStatus()).to.equal(UNMOUNTED);
      expect(React.findDOMNode(instance)).to.not.exist;

      instance.setState({in: true});
    });

    it('should unmount after exiting', done => {
      const instance = render(
        <UnmountTransition
          initialIn={true}

          onExited={() => {
            expect(instance.getStatus()).to.equal(UNMOUNTED);
            expect(React.findDOMNode(instance)).to.not.exist;

            done();
          }}
        />
      );

      expect(instance.getStatus()).to.equal(ENTERED);
      expect(React.findDOMNode(instance)).to.exist;

      instance.setState({in: false});
    });
  });
});
