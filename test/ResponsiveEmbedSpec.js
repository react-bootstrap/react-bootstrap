import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ResponsiveEmbed from '../src/ResponsiveEmbed';
import { shouldWarn } from './helpers';

describe('ResponsiveEmbed', () => {
  it('should contain `embed-responsive` class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let instanceClassName = React.findDOMNode(instance).className;
    assert.ok(instanceClassName, 'embed-responsive');
  });

  it('should warn if neither `a16by9` nor `a4by3` attribute is set', () => {
    ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed>
        <div />
      </ResponsiveEmbed>
    );

    shouldWarn('`a16by9` or `a4by3` attribute must be set.');
  });

  it('should warn about both `a16by9` or `a4by3` attributes set', () => {
    ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 a4by3>
        <div />
      </ResponsiveEmbed>
    );

    shouldWarn('Either `a16by9` or `a4by3` attribute can be set. Not both.');
  });

  it('should add `embed-responsive-item` class to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let child = React.findDOMNode(instance).firstChild;
    assert.ok(child.className.match(/\bembed-responsive-item\b/));
  });

  it('should add custom classes to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 className='custom-class'>
        <div />
      </ResponsiveEmbed>
    );

    let child = React.findDOMNode(instance).firstChild;
    assert.ok(child.className.match(/\bcustom-class\b/));
  });

  it('should pass custom attributes to child element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9 style={{color: 'white'}}>
        <div />
      </ResponsiveEmbed>
    );

    let child = React.findDOMNode(instance).firstChild;
    assert.equal(child.style.color, 'white');
  });

  it('should add `embed-responsive-16by9` class with `a16by9` attribute set', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a16by9>
        <div />
      </ResponsiveEmbed>
    );

    let wrapper = React.findDOMNode(instance);
    assert.ok(wrapper.className.match(/\bembed-responsive-16by9\b/));
  });

  it('should add `embed-responsive-4by3` class with `a4by3` attribute set', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ResponsiveEmbed a4by3>
        <div />
      </ResponsiveEmbed>
    );

    let wrapper = React.findDOMNode(instance);
    assert.ok(wrapper.className.match(/\bembed-responsive-4by3\b/));
  });
});
