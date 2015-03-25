import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', function () {
  it('Should output a button group', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
  });

  it('Should add size', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup bsSize='large'>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(instance.getDOMNode().className.trim(), 'btn-group-vertical');
  });

  it('Should add justified variation', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup justified>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-justified\b/));
  });
});
