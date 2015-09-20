import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Input from '../src/Input';
import Button from '../src/Button';
import DropdownButton from '../src/DropdownButton';
import MenuItem from '../src/MenuItem';
import Glyphicon from '../src/Glyphicon';
import {shouldWarn} from './helpers';

describe('Input', () => {
  it('renders children when type is not set', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input>
        <span />
      </Input>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
    assert.throw(instance.getValue);
  });

  it('renders a select element when type=select', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" defaultValue="v">
        <option value="v" />
        <option value="w" />
      </Input>
    );

    let select = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'select');
    assert.ok(select);
    assert.equal(React.findDOMNode(select).children.length, 2);
    assert.equal(instance.getValue(), 'v');
  });

  it('renders a textarea element when type=textarea', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="textarea" defaultValue="v" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'textarea'));
    assert.equal(instance.getValue(), 'v');
  });

  it('throws a warning when type=static', () => {
    ReactTestUtils.renderIntoDocument(
      <Input type="static" value="v" />
    );

    shouldWarn('deprecated');
  });

  it('renders an input element of given type when type is anything else', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" defaultValue="v" />
    );

    let node = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input'));
    assert.equal(node.getAttribute('type'), 'text');
    assert.equal(instance.getValue(), 'v');
  });

  it('renders form-group wrapper', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input groupClassName="group" bsStyle="error" />
    );

    let node = React.findDOMNode(instance);
    assert.include(node.className, 'form-group');
    assert.include(node.className, 'group');
    assert.include(node.className, 'has-error');
  });

  it('renders label', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input label="Label" labelClassName="label" id="input" />
    );

    let node = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'label'));
    assert.ok(node);
    assert.include(node.className, 'label');
    assert.equal(node.textContent, 'Label');
    assert.equal(node.getAttribute('for'), 'input');
  });

  it('renders wrapper', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input wrapperClassName="wrapper" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'wrapper'));
  });


  it('renders input-group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input addonBefore="$" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-addon'));
  });

  it('renders form-group with sm or lg class when bsSize is small or large', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input bsSize="small" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group-sm'));

    instance = ReactTestUtils.renderIntoDocument(
      <Input bsSize="large" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group-lg'));
  });

  it('renders input-group with sm or lg class name when bsSize is small or large', () => {
    let instance = ReactTestUtils.renderIntoDocument(
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

  it('renders btn-group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input buttonAfter={<Button>!</Button>} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-btn'));
  });

  it('renders btn-group with dropdown', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input buttonAfter={<DropdownButton title='dropdown' id='herpa-derpa'>
          <MenuItem key='1'>One</MenuItem>
      </DropdownButton>} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'input-group-btn'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'btn'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown-menu'));
  });

  it('renders help', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input help="Help" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'help-block'));
  });

  it('renders form-group class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-group'));
  });

  it('renders no form-group class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input standalone />
    );

    assert.equal(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'form-group').length, 0);
  });

  it('renders custom-form-group class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input groupClassName='custom-form-class' />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'custom-form-class'));
  });

  it('renders feedback icon', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input hasFeedback={true} bsStyle="error" />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-control-feedback'));
  });

  it('renders file correctly', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="file" wrapperClassName="wrapper" label="Label" help="h" />
    );

    let node = React.findDOMNode(instance);
    assert.include(node.className, 'form-group');
    assert.equal(node.children[0].tagName.toLowerCase(), 'label');
    assert.include(node.children[1].className, 'wrapper');
    assert.equal(node.children[1].children[0].tagName.toLowerCase(), 'input');
    assert.equal(node.children[1].children[0].className, '');
    assert.equal(node.children[1].children[0].type, 'file');
    assert.equal(node.children[1].children[1].className, 'help-block');
  });

  it('renders checkbox/radio correctly', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="checkbox" wrapperClassName="wrapper" label="Label" help="h" />
    );

    let node = React.findDOMNode(instance);
    assert.include(node.className, 'form-group');
    assert.include(node.children[0].className, 'wrapper');
    assert.include(node.children[0].children[0].className, 'checkbox');
    assert.equal(node.children[0].children[0].children[0].tagName.toLowerCase(), 'label');
    assert.equal(node.children[0].children[0].children[0].children[0].tagName.toLowerCase(), 'input');
    assert.include(node.children[0].children[1].className, 'help-block');
  });

  it('renders non-checkbox/radio correctly', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" label="l" wrapperClassName="wrapper" addonAfter="a" hasFeedback={true} help="h"/>
    );

    let node = React.findDOMNode(instance);
    assert.include(node.className, 'form-group');
    assert.equal(node.children[0].tagName.toLowerCase(), 'label');
    assert.include(node.children[1].className, 'wrapper');
    assert.include(node.children[1].children[0].className, 'input-group');
    assert.equal(node.children[1].children[0].children[0].tagName.toLowerCase(), 'input');
    assert.equal(node.children[1].children[0].children[1].tagName.toLowerCase(), 'span');
    assert.include(node.children[1].children[1].className, 'form-control-feedback');
    assert.include(node.children[1].children[2].className, 'help-block');
  });

  it('returns checked value for checkbox/radio', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="checkbox" checked readOnly />
    );

    assert.equal(instance.getChecked(), true);
  });

  it('returns the only selected option for select', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" value={'one'}>
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
      </Input>
    );

    assert.equal(instance.getValue(), 'one');
  });

  it('returns all selected options for multiple select', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="select" multiple value={['one', 'two']}>
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
      </Input>
    );

    assert.deepEqual(instance.getValue(), ['one', 'two']);
  });

  it('renders a disabled input correctly', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Input type="text" disabled={true} />
    );

    let node = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input'));
    assert.isNotNull(node.getAttribute('disabled'));
  });

  context('when Input listens to feedback', () => {
    it('renders success feedback as Glyphicon', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Input hasFeedback={true} bsStyle="success" />
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon'));
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon-ok'));
    });

    it('renders warning feedback as Glyphicon', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Input hasFeedback={true} bsStyle="warning" />
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon'));
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon-warning-sign'));
    });

    it('renders error feedback as Glyphicon', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Input hasFeedback={true} bsStyle="error" />
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon'));
      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon-remove'));
    });

    context('when using feedbackIcon', () => {
      it('uses the feedbackIcon', () => {
        let customIcon = <Glyphicon glyph="star" />;

        let instance = ReactTestUtils.renderIntoDocument(
            <Input feedbackIcon={customIcon} hasFeedback={true} bsStyle="success" />
        );

        assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon'));
        assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'glyphicon-star'));
      });

      it('adds the .form-control-feedback class for Glyphicons', () => {
        let customIcon = <Glyphicon glyph="star" />;

        let instance = ReactTestUtils.renderIntoDocument(
            <Input feedbackIcon={customIcon} hasFeedback={true} bsStyle="success" />
        );

        assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'form-control-feedback'));
      });
    });
  });
});
