/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Input          = require('../lib/Input');
var Button         = require('../lib/Button');
var DropdownButton = require('../lib/DropdownButton');
var MenuItem       = require('../lib/MenuItem');

describe('Input', function () {
  beforeEach(function() {
    sinon.spy(console, 'warn');
  })

  afterEach(function() {
    if (typeof console.warn.restore  === 'function') {
      console.warn.called.should.be.false;
      console.warn.restore();
    }
  });

  it('renders children when type is not set', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input>
        <span />
      </Input>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
    assert.throw(instance.getValue)
  });

  it('renders a select element when type=select', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" defaultValue="v">
        <option value="v" />
        <option value="w" />
      </Input>
    );

    var select = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'select');
    assert.ok(select);
    assert.equal(select.getDOMNode().children.length, 2)
    assert.equal(instance.getValue(), 'v');
  });

  it('renders a textarea element when type=textarea', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="textarea" defaultValue="v" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'textarea'));
    assert.equal(instance.getValue(), 'v');
  });

  it('renders a submit button element when type=submit', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="submit" bsStyle="danger" wrapperClassName='test' />
    );

    node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.equal(node.getAttribute('type'), 'submit');
    assert.equal(node.getAttribute('class'), 'btn btn-danger');
  });

  it('renders a p element when type=static', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="static" value="v" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p'));
    assert.equal(instance.getValue(), 'v');
  });

  it('renders an input element of given type when type is anything else', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" defaultValue="v" />
    );

    var node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.equal(node.getAttribute('type'), 'text');
    assert.equal(instance.getValue(), 'v');
  });

  it('renders form-group wrapper', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input groupClassName="group" bsStyle="error" />
    );

    var node = instance.getDOMNode();
    assert.include(node.className, 'form-group');
    assert.include(node.className, 'group');
    assert.include(node.className, 'has-error');
  });

  it('renders label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input label="Label" labelClassName="label" id="input" />
    );

    var node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'label').getDOMNode();
    assert.ok(node);
    assert.include(node.className, 'label');
    assert.equal(node.textContent, 'Label');
    assert.equal(node.getAttribute('for'), 'input');
  });

  it('renders wrapper', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input wrapperClassName="wrapper" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'wrapper'));
  });


  it('renders input-group', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input addonBefore="$" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-addon'));
  });

  it('renders input-group with sm or lg class name when bsSize is small or large', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input addonBefore="$" bsSize="small" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-sm'));

    instance = ReactTestUtils.renderIntoDocument(
      <Input addonBefore="$" bsSize="large" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-lg'));
  });

  it('renders btn-group', function() {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input buttonAfter={<Button>!</Button>} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-btn'));
  })

  it('renders btn-group with dropdown', function() {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input buttonAfter={<DropdownButton title="dropdown">
          <MenuItem key="1">One</MenuItem>
      </DropdownButton>} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-btn'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'btn'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown-menu'));
  })

  it('renders help', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input help="Help" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'help-block'));
  });

  it('renders feedback icon', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input hasFeedback={true} bsStyle="error" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-control-feedback'));
  });

  it('renders file correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="file" wrapperClassName="wrapper" label="Label" help="h" />
    );

    var node = instance.getDOMNode();
    assert.include(node.className, 'form-group');
    assert.equal(node.children[0].tagName.toLowerCase(), 'label');
    assert.include(node.children[1].className, 'wrapper');
    assert.equal(node.children[1].children[0].tagName.toLowerCase(), 'input');
    assert.equal(node.children[1].children[0].className, '');
    assert.equal(node.children[1].children[0].type, 'file');
    assert.equal(node.children[1].children[1].className, 'help-block');
  });

  it('renders checkbox/radio correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="checkbox" wrapperClassName="wrapper" label="Label" help="h" />
    );

    var node = instance.getDOMNode();
    assert.include(node.className, 'form-group');
    assert.include(node.children[0].className, 'wrapper');
    assert.include(node.children[0].children[0].className, 'checkbox');
    assert.equal(node.children[0].children[0].children[0].tagName.toLowerCase(), 'label');
    assert.equal(node.children[0].children[0].children[0].children[0].tagName.toLowerCase(), 'input');
    assert.include(node.children[0].children[1].className, 'help-block');
  });

  it('renders non-checkbox/radio correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" label="l" wrapperClassName="wrapper" addonAfter="a" hasFeedback={true} help="h"/>
    );

    var node = instance.getDOMNode();
    assert.include(node.className, 'form-group');
    assert.equal(node.children[0].tagName.toLowerCase(), 'label');
    assert.include(node.children[1].className, 'wrapper');
    assert.include(node.children[1].children[0].className, 'input-group');
    assert.equal(node.children[1].children[0].children[0].tagName.toLowerCase(), 'input');
    assert.equal(node.children[1].children[0].children[1].tagName.toLowerCase(), 'span');
    assert.include(node.children[1].children[1].className, 'form-control-feedback');
    assert.include(node.children[1].children[2].className, 'help-block');
  });

  it('returns checked value for checkbox/radio', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="checkbox" checked readOnly />
    );

    assert.equal(instance.getChecked(), true);
  });

  it('returns the only selected option for select', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" value={'one'}>
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
      </Input>
    );

    assert.equal(instance.getValue(), 'one');
  })

  it('returns all selected options for multiple select', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" multiple value={['one','two']}>
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
      </Input>
    );

    assert.deepEqual(instance.getValue(), ['one', 'two']);
  })

  it('renders a disabled input correctly', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" disabled={true} />
    );

    var node = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input').getDOMNode();
    assert.isNotNull(node.getAttribute('disabled'));
  });
});
