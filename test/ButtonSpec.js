import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Button from '../src/Button';

describe('Button', function () {
  it('Should output a button', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button>
        Title
      </Button>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'BUTTON');
  });

  it('Should have type=button by default', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button>
        Title
      </Button>
    );
    assert.equal(React.findDOMNode(instance).getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button type='submit'>
        Title
      </Button>
    );
    assert.equal(React.findDOMNode(instance).getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', function () {
    let href = '/url';
    let instance = ReactTestUtils.renderIntoDocument(
      <Button href={href}>
        Title
      </Button>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'A');
    assert.equal(React.findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should output an anchor if called with a target', function () {
    let target = '_blank';
    let instance = ReactTestUtils.renderIntoDocument(
      <Button target={target}>
        Title
      </Button>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'A');
    assert.equal(React.findDOMNode(instance).getAttribute('target'), target);
  });

  it('Should call onClick callback', function (done) {
    let doneOp = function () {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Button onClick={doneOp}>
        Title
      </Button>
    );
    ReactTestUtils.Simulate.click(React.findDOMNode(instance));
  });

  it('Should be disabled', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button disabled>
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).disabled);
  });

  it('Should be disabled link', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button disabled href='#'>
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should have block class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button block>
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle='danger'>
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button className="bob" bsStyle="danger">
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle='default'>
        Title
      </Button>
    );
    assert.equal(instance.props.bsStyle, 'default');
  });

  it('Should be active', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button active>
        Title
      </Button>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bactive\b/));
  });

  it('Should render an anchor in a list item when in a nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button navItem active>
        Title
      </Button>
    );

    let li = React.findDOMNode(instance);
    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bactive\b/));
    assert.ok(anchor.props.href, '#');
  });

  it('Should render an anchor when in a navDropdown', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button navDropdown>
        Title
      </Button>
    );

    let anchor = React.findDOMNode(instance);
    assert.equal(anchor.nodeName, 'A');
    assert.ok(anchor.getAttribute('href'), '#');
  });
});
