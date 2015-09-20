import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';
import { shouldWarn } from './helpers';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-group\b/));
  });

  it('Should add size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup bsSize='large'>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(React.findDOMNode(instance).className.trim(), 'btn-group-vertical');
  });

  it('Should add block variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical block>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should warn about block without vertical', () => {
    ReactTestUtils.renderIntoDocument(
      <ButtonGroup block>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    shouldWarn('The block property requires the vertical property to be set to have any effect');
  });

  it('Should add justified variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup justified>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-group-justified\b/));
  });
});
