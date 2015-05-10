import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import CollapsableMixin from '../src/CollapsableMixin';
import classNames from 'classnames';
import {shouldWarn} from './helpers';

describe('CollapsableMixin', function () {

  let Component, instance;

  beforeEach(function(){
    Component = React.createClass({
      mixins: [CollapsableMixin],

      getCollapsableDOMNode(){
        return this.refs.panel.getDOMNode();
      },

      getCollapsableDimensionValue(){
        return 15;
      },

      render(){
        let styles = this.getCollapsableClassSet();
        return (
          <div>
            <div ref="panel" className={classNames(styles)}>
              {this.props.children}
            </div>
          </div>
        );
      }
    });
  });

  describe('getInitialState', function(){
    it('Should check defaultExpanded', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component defaultExpanded>Panel content</Component>
      );
      let state = instance.getInitialState();
      assert.ok(state.expanded === true);
      shouldWarn('deprecated');
    });

    it('Should default collapsing to false', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );
      let state = instance.getInitialState();
      assert.ok(state.collapsing === false);
      shouldWarn('deprecated');
    });
  });

  describe('collapsed', function(){
    it('Should have collapse class', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'collapse'));
      shouldWarn('deprecated');
    });
  });

  describe('from collapsed to expanded', function(){
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );
    });

    it('Should have collapsing class', function () {
      instance.setProps({expanded:true});
      let node = instance.getCollapsableDOMNode();
      assert.equal(node.className, 'collapsing');
      shouldWarn('deprecated');
    });

    it('Should set initial 0px height', function () {
      let node = instance.getCollapsableDOMNode();
      assert.equal(node.style.height, '');

      instance._afterWillUpdate = function(){
        assert.equal(node.style.height, '0px');
      };

      instance.setProps({expanded:true});
      shouldWarn('deprecated');
    });

    it('Should set transition to height', function () {
      let node = instance.getCollapsableDOMNode();
      assert.equal(node.styled, undefined);

      instance.setProps({expanded:true});
      assert.equal(node.style.height, '15px');
      shouldWarn('deprecated');
    });

    it('Should transition from collapsing to not collapsing', function (done) {
      instance._addEndEventListener = function(node, complete){
        setTimeout(function(){
          complete();
          assert.ok(!instance.state.collapsing);
          shouldWarn('deprecated');
          done();
        }, 100);
      };
      instance.setProps({expanded:true});
      assert.ok(instance.state.collapsing);
    });

    it('Should clear height after transition complete', function (done) {
      let node = instance.getCollapsableDOMNode();

      instance._addEndEventListener = function(nodeInner, complete){
        setTimeout(function(){
          complete();
          assert.equal(nodeInner.style.height, '');
          shouldWarn('deprecated');
          done();
        }, 100);
      };

      assert.equal(node.style.height, '');
      instance.setProps({expanded:true});
      assert.equal(node.style.height, '15px');
    });
  });

  describe('from expanded to collapsed', function(){
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component defaultExpanded>Panel content</Component>
      );
    });

    it('Should have collapsing class', function () {
      instance.setProps({expanded:false});
      let node = instance.getCollapsableDOMNode();
      assert.equal(node.className, 'collapsing');
      shouldWarn('deprecated');
    });

    it('Should set initial height', function () {
      let node = instance.getCollapsableDOMNode();

      instance._afterWillUpdate = function(){
        assert.equal(node.style.height, '15px');
      };

      assert.equal(node.style.height, '');
      instance.setProps({expanded:false});
      shouldWarn('deprecated');
    });

    it('Should set transition to height', function () {
      let node = instance.getCollapsableDOMNode();
      assert.equal(node.style.height, '');

      instance.setProps({expanded:false});
      assert.equal(node.style.height, '0px');
      shouldWarn('deprecated');
    });

    it('Should transition from collapsing to not collapsing', function (done) {
      instance._addEndEventListener = function(node, complete){
        setTimeout(function(){
          complete();
          assert.ok(!instance.state.collapsing);
          shouldWarn('deprecated');
          done();
        }, 100);
      };
      instance.setProps({expanded:false});
      assert.ok(instance.state.collapsing);
    });

    it('Should have 0px height after transition complete', function (done) {
      let node = instance.getCollapsableDOMNode();

      instance._addEndEventListener = function(nodeInner, complete){
        setTimeout(function(){
          complete();
          assert.ok(nodeInner.style.height === '0px');
          shouldWarn('deprecated');
          done();
        }, 100);
      };

      assert.equal(node.style.height, '');
      instance.setProps({expanded:false});
      assert.equal(node.style.height, '0px');
    });
  });

  describe('expanded', function(){
    it('Should have collapse and in class', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component expanded={true}>Panel content</Component>
      );
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'collapse in'));
      shouldWarn('deprecated');
    });

    it('Should have collapse and in class with defaultExpanded', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component defaultExpanded>Panel content</Component>
      );
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'collapse in'));
      shouldWarn('deprecated');
    });
  });

  describe('dimension', function(){
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );
    });

    it('Defaults to height', function(){
      assert.equal(instance.dimension(), 'height');
      shouldWarn('deprecated');
    });

    it('Uses getCollapsableDimension if exists', function(){
      instance.getCollapsableDimension = function(){
        return 'whatevs';
      };
      assert.equal(instance.dimension(), 'whatevs');
      shouldWarn('deprecated');
    });
  });
});
