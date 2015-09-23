import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import BootstrapMixin from '../src/BootstrapMixin';
import styleMaps from '../src/styleMaps';
import { shouldWarn } from './helpers';

let Component;

describe('BootstrapMixin', () => {
  beforeEach(() => {
    Component = React.createClass({
      mixins: [BootstrapMixin],

      render() {
        return React.DOM.button(this.props);
      }
    });
  });

  describe('#getBsClassSet', () => {
    it('should return blank', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Component>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {});
    });

    it('maps and validates OK default classes', () => {
      function instanceClassSet(bsClass) {
        let instance = ReactTestUtils.renderIntoDocument(
          <Component bsClass={bsClass}>
            content
          </Component>
        );
        return instance.getBsClassSet();
      }

      assert.deepEqual(instanceClassSet('column'), {'col': true});
      assert.deepEqual(instanceClassSet('button'), {'btn': true});
      assert.deepEqual(instanceClassSet('button-group'), {'btn-group': true});
      assert.deepEqual(instanceClassSet('label'), {'label': true});
      assert.deepEqual(instanceClassSet('alert'), {'alert': true});
      assert.deepEqual(instanceClassSet('input-group'), {'input-group': true});
      assert.deepEqual(instanceClassSet('form'), {'form': true});
      assert.deepEqual(instanceClassSet('panel'), {'panel': true});
    });

    describe('Predefined Bootstrap styles', () => {
      it('maps and validates OK default styles', () => {
        function instanceClassSet(style) {
          let instance = ReactTestUtils.renderIntoDocument(
            <Component bsClass='button' bsStyle={style}>
              content
            </Component>
          );
          return instance.getBsClassSet();
        }

        assert.deepEqual(instanceClassSet('default'), {'btn': true, 'btn-default': true});
        assert.deepEqual(instanceClassSet('primary'), {'btn': true, 'btn-primary': true});
        assert.deepEqual(instanceClassSet('success'), {'btn': true, 'btn-success': true});
        assert.deepEqual(instanceClassSet('info'), {'btn': true, 'btn-info': true});
        assert.deepEqual(instanceClassSet('link'), {'btn': true, 'btn-link': true});
        assert.deepEqual(instanceClassSet('inline'), {'btn': true, 'btn-inline': true});
      });
    });

    describe('Sizes', () => {
      it('maps english words for sizes to bootstrap sizes constants', () => {
        function instanceClassSet(size) {
          let instance = ReactTestUtils.renderIntoDocument(
            <Component bsClass='button' bsSize={size}>
              content
            </Component>
          );
          return instance.getBsClassSet();
        }

        assert.deepEqual(instanceClassSet('large'), {'btn': true, 'btn-lg': true});
        assert.deepEqual(instanceClassSet('small'), {'btn': true, 'btn-sm': true});
        assert.deepEqual(instanceClassSet('medium'), {'btn': true, 'btn-md': true});
        assert.deepEqual(instanceClassSet('xsmall'), {'btn': true, 'btn-xs': true});
      });
    });

    describe('Custom styles', () => {
      it('should validate OK custom styles added via "addStyle()"', () => {

        styleMaps.addStyle('wacky');

        let instance = ReactTestUtils.renderIntoDocument(
          <Component bsClass='button' bsStyle='wacky'>
            content
          </Component>
        );
        assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-wacky': true});
      });

      it('should allow custom styles as is but with validation warning', () => {
        let instance = ReactTestUtils.renderIntoDocument(
          <Component bsClass='button' bsStyle='my-custom-class'>
            content
          </Component>
        );
        assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'my-custom-class': true});
        shouldWarn('Invalid prop `bsStyle` of value `my-custom-class`');
      });
    });
  });

  // todo: fix bad naming
  describe('#prefixClass', () => {
    it('allows custom sub-classes', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button'>
          content
        </Component>
      );
      assert.equal(instance.prefixClass('title'), 'btn-title');
    });
  });
});
