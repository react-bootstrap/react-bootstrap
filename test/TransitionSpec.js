import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { render } from './helpers';
import Transition from '../src/Transition';
//import classNames from 'classnames';

describe('Transition', function () {


  it('should not transition on mount', function(){
    let instance = render(
          <Transition in onEnter={()=> { throw new Error('should not Enter'); }}>
            <div></div>
          </Transition>
        );

    instance.state.in.should.equal(true);
    assert.ok(!instance.state.transitioning);
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

    instance.state.in.should.equal(true);
    instance.state.transitioning.should.equal(true);
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

      instance.state.in.should.equal(false);

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

      instance.state.in.should.equal(false);

      instance = instance.renderWithProps({

        in: true,

        onEnter(){
          count++;
          instance.state.in.should.equal(false);
          instance.state.transitioning.should.equal(false);
        },

        onEntering(){
          count++;
          instance.state.in.should.equal(true);
          instance.state.transitioning.should.equal(true);
        },

        onEntered(){
          instance.state.in.should.equal(true);
          instance.state.transitioning.should.equal(false);
          assert.ok(count === 2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      instance.state.in.should.equal(false);

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

      instance.state.in.should.equal(true);

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

      instance.state.in.should.equal(true);

      instance = instance.renderWithProps({

        in: false,

        onExit(){
          count++;
          instance.state.in.should.equal(true);
          instance.state.transitioning.should.equal(false);
        },

        onExiting(){
          count++;
          instance.state.in.should.equal(false);
          instance.state.transitioning.should.equal(true);
        },

        onExited(){
          instance.state.in.should.equal(false);
          instance.state.transitioning.should.equal(false);
          //assert.ok(count === 2);
          done();
        }
      });
    });

    it('should apply classes at each transition state', done => {
      let count = 0;

      instance.state.in.should.equal(true);

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
