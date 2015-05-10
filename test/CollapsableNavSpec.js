import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import CollapsibleNav from '../src/CollapsibleNav';
import Nav from '../src/Nav';
import Panel from '../src/Panel';
import {shouldWarn} from './helpers';

describe('Deprecations for collapsable property in CollapsibleNav', function () {
  it('Should not warn about deprecation when collaps_i_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <CollapsibleNav collapsible />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    console.warn.called.should.be.false;
  });

  it('Should warn about deprecation when collaps_a_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <CollapsibleNav collapsable />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    shouldWarn('deprecated');
  });
});

describe('Deprecations for collapsable property in Panel', function () {
  it('Should not warn about deprecation when collaps_i_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <Panel collapsible />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    console.warn.called.should.be.false;
  });

  it('Should warn about deprecation when collaps_a_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <Panel collapsable />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    shouldWarn('deprecated');
  });
});

describe('Deprecations for collapsable property in Nav', function () {
  it('Should not warn about deprecation when collaps_i_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <Nav collapsible />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    console.warn.called.should.be.false;
  });

  it('Should warn about deprecation when collaps_a_ble property is used', function () {
    let Component = React.createClass({
      render() {
        return (
          <Nav collapsable />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    shouldWarn('deprecated');
  });
});
