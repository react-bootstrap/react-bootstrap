import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ProgressBar from '../src/ProgressBar';

import { getOne, shouldWarn } from './helpers';

function getProgressBarNode(wrapper) {
  return ReactTestUtils.findRenderedDOMComponentWithClass(wrapper, 'progress-bar');
}

describe('<ProgressBar>', () => {
  it('Should output a progress bar with wrapper', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bprogress\b/));
    assert.ok(getProgressBarNode(instance).className.match(/\bprogress-bar\b/));
    assert.equal(getProgressBarNode(instance).getAttribute('role'), 'progressbar');
  });

  it('Should have the default class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} />
    );

    assert.ok(getProgressBarNode(instance).className.match(/\bprogress-bar\b/));
  });

  it('Should have the success class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle="success" />
    );

    assert.ok(getProgressBarNode(instance).className.match(/\bprogress-bar-success\b/));
  });

  it('Should have the warning class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle="warning" />
    );

    assert.ok(getProgressBarNode(instance).className.match(/\bprogress-bar-warning\b/));
  });

  it('Should default to min:0, max:100', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar now={5} />
    );
    const bar = getProgressBarNode(instance);

    assert.equal(bar.getAttribute('aria-valuemin'), '0');
    assert.equal(bar.getAttribute('aria-valuemax'), '100');
  });

  it('Should have 0% computed width', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} />
    );

    assert.equal(getProgressBarNode(instance).style.width, '0%');
  });

  it('Should have 10% computed width', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={1} />
    );

    assert.equal(getProgressBarNode(instance).style.width, '10%');
  });

  it('Should have 100% computed width', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={10} />
    );

    assert.equal(getProgressBarNode(instance).style.width, '100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} />
    );

    assert.equal(getProgressBarNode(instance).style.width, '50%');
  });

  it('Should not have label', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} />
    );

    assert.equal(ReactDOM.findDOMNode(instance).textContent, '');
  });

  it('Should have label', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        bsStyle="success"
        label="progress bar label"
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).textContent, 'progress bar label');
  });

  it('Should have screen reader only label', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        srOnly
        bsStyle="success"
        label="progress bar label"
      />
    );
    const srLabel = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only');

    assert.equal(srLabel.textContent, 'progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = (
      <strong className="special-label">My label</strong>
    );

    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} label={customLabel} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'special-label'));
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = (
      <strong className="special-label">My label</strong>
    );

    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} label={customLabel} srOnly />
    );

    const srLabel = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only');
    const component = getOne(srLabel.getElementsByClassName('special-label'));

    assert.ok(component);
  });

  it('Should show striped bar', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} striped />
    );

    assert.ok(ReactDOM.findDOMNode(instance).firstChild.className.match(/\bprogress-bar-striped\b/));
  });

  it('Should show animated striped bar', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} active />
    );

    const barClassName = ReactDOM.findDOMNode(instance).firstChild.className;

    assert.ok(barClassName.match(/\bprogress-bar-striped\b/));
    assert.ok(barClassName.match(/\bactive\b/));
  });

  it('Should show stacked bars', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar>
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>
    );
    const wrapper = ReactDOM.findDOMNode(instance);
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(wrapper.className.match(/\bprogress\b/));
    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.equal(bar1.style.width, '50%');
    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.equal(bar2.style.width, '30%');
  });

  it('Should render active and striped children in stacked bar too', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar>
        <ProgressBar active key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>
    );
    const wrapper = ReactDOM.findDOMNode(instance);
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(wrapper.className.match(/\bprogress\b/));

    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.ok(bar1.className.match(/\bactive\b/));
    assert.ok(bar1.className.match(/\bprogress-bar-striped\b/));

    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.ok(bar2.className.match(/\bprogress-bar-striped\b/));
    assert.notOk(bar2.className.match(/\bactive\b/));
  });

  it('Should forward className and style to nested bars', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar>
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>
    );
    const wrapper = ReactDOM.findDOMNode(instance);
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(bar1.className.match(/\bbar1\b/));
    assert.equal(bar2.style.minWidth, '10px');
  });

  it('allows only ProgressBar in children', () => {
    shouldWarn('Failed prop');

    function NotProgressBar() {
      return null;
    }

    ReactTestUtils.renderIntoDocument(
      <ProgressBar>
        <ProgressBar key={1} />
        <NotProgressBar />
        foo
        <ProgressBar key={2} />
      </ProgressBar>
    );
  });
});
