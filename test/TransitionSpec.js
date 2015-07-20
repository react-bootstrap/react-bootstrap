import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { render } from './helpers';
import Transition, {EXITED, ENTERING, ENTERED, EXITING} from
  '../src/Transition';

describe('Transition', function () {
  it('should not transition on mount', function(){
    let instance = render(
          <Transition in onEnter={()=> { throw new Error('should not Enter'); }}>
            <div></div>
          </Transition>
        );

    instance.state.status.should.equal(ENTERED);
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

    instance.state.status.should.equal(EXITED);
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

      instance.state.status.should.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter,

        onEntering,

        onEntered(){
          assert.ok(onEnter.calledOnce);
          assert.ok(onEntering.calledOnce);
          assert.ok(onEnter.calledBefore(onEntering));
          done();
        }
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      instance.state.status.should.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter(){
          count++;
          instance.state.status.should.equal(EXITED);
        },

        onEntering(){
          count++;
          instance.state.status.should.equal(ENTERING);
        },

        onEntered(){
          instance.state.status.should.equal(ENTERED);
          assert.ok(count === 2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      instance.state.status.should.equal(EXITED);

      instance = instance.renderWithProps({
        in: true,

        onEnter(node){
          count++;
          assert.equal(node.className, '');
        },

        onEntering(node){
          count++;
          assert.equal(node.className, 'test-entering');
        },

        onEntered(node){
          assert.equal(node.className, 'test-enter');
          assert.ok(count === 2);
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

      instance.state.status.should.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit,

        onExiting,

        onExited(){
          assert.ok(onExit.calledOnce);
          assert.ok(onExiting.calledOnce);
          assert.ok(onExit.calledBefore(onExiting));
          done();
        }
      });
    });

    it('should move to each transition state', done => {
      let count = 0;

      instance.state.status.should.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit(){
          count++;
          instance.state.status.should.equal(ENTERED);
        },

        onExiting(){
          count++;
          instance.state.status.should.equal(EXITING);
        },

        onExited(){
          instance.state.status.should.equal(EXITED);
          //assert.ok(count === 2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      instance.state.status.should.equal(ENTERED);

      instance = instance.renderWithProps({
        in: false,

        onExit(node){
          count++;
          assert.equal(node.className, '');
        },

        onExiting(node){
          count++;
          assert.equal(node.className, 'test-exiting');
        },

        onExited(node){
          assert.equal(node.className, 'test-exit');
          assert.ok(count === 2);
          done();
        }
      });
    });
  });
});
