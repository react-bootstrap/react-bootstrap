import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Figure from '../src/Figure';

describe('Figure', () => {
  describe('General', () => {
    it('should be a Figure', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Figure />);
      let figure = ReactDOM.findDOMNode(instance);

      figure.nodeName.should.equal('FIGURE');
    });
  });

  describe('Figure.Image', () => {
    it('should be an image', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Figure.Image />);
      let image = ReactDOM.findDOMNode(instance);

      image.nodeName.should.equal('IMG');
    });

    it('should provide src and alt prop', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Figure.Image src="image.jpg" alt="this is alt" />
      );
      let image = ReactDOM.findDOMNode(instance);

      assert.equal(image.getAttribute('src'), 'image.jpg');
      assert.equal(image.getAttribute('alt'), 'this is alt');
    });

    it('should have correct class when fluid prop is set', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Figure.Image fluid />);
      let imageClassName = ReactDOM.findDOMNode(instance).className;

      imageClassName.should.match(/\bimg-fluid\b/);
    });

    it('should not override class when rounded prop is set', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Figure.Image rounded />
      );
      let imageClassName = ReactDOM.findDOMNode(instance).className;

      imageClassName.should.match(/\bfigure-img img-fluid rounded\b/);
    });

    it('should have correct class when rounded prop is set', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Figure.Image rounded />
      );
      let imageClassName = ReactDOM.findDOMNode(instance).className;

      imageClassName.should.match(/\brounded\b/);
    });

    it('should have correct class when roundedCircle prop is set', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Figure.Image roundedCircle />
      );
      let imageClassName = ReactDOM.findDOMNode(instance).className;

      imageClassName.should.match(/\brounded-circle\b/);
    });

    it('should have correct class when thumbnail prop is set', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Figure.Image thumbnail />
      );
      let imageClassName = ReactDOM.findDOMNode(instance).className;

      imageClassName.should.match(/\bimg-thumbnail\b/);
    });
  });
});
