import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Image from '../src/Image';

describe('Image', () => {
  it('should be an image', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Image />);
    let image = ReactDOM.findDOMNode(instance);

    image.nodeName.should.equal('IMG');
  });

  it('should provide src and alt prop', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Image src="image.jpg" alt="this is alt" />
    );
    let image = ReactDOM.findDOMNode(instance);

    assert.equal(image.getAttribute('src'), 'image.jpg');
    assert.equal(image.getAttribute('alt'), 'this is alt');
  });

  it('should have correct class when responsive prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Image responsive />);
    let imageClassName = ReactDOM.findDOMNode(instance).className;

    imageClassName.should.match(/\bimg-responsive\b/);
  });

  it('should have correct class when rounded prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Image rounded />);
    let imageClassName = ReactDOM.findDOMNode(instance).className;

    imageClassName.should.match(/\bimg-rounded\b/);
  });

  it('should have correct class when circle prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Image circle />);
    let imageClassName = ReactDOM.findDOMNode(instance).className;

    imageClassName.should.match(/\bimg-circle\b/);
  });

  it('should have correct class when thumbnail prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Image thumbnail />);
    let imageClassName = ReactDOM.findDOMNode(instance).className;

    imageClassName.should.match(/\bimg-thumbnail\b/);
  });
});
