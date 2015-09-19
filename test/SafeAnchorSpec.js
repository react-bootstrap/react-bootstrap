import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SafeAnchor from '../src/SafeAnchor';

describe('SafeAnchor', () => {
  it('renders an anchor tag', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor />);
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('A');
  });

  it('forwards arbitrary props to the anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor herpa='derpa' />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.herpa.should.equal('derpa');
  });

  it('forwards provided href', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor href='http://google.com' />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.href.should.equal('http://google.com');
  });

  it('ensures that an href is provided', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.href.should.equal('');
  });

  it('forwards onClick handler', (done) => {
    const handleClick = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor onClick={handleClick} />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(anchor);
  });

  it('prevents default when no href is provided', (done) => {
    const handleClick = (event) => {
      expect(event.isDefaultPrevented()).to.not.be.ok;

      setTimeout(() => {
        event.isDefaultPrevented().should.be.true;
        done();
      }, 100);
    };
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor onClick={handleClick} />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(anchor);
  });

  it('does not prevent default when href is provided', (done) => {
    const handleClick = (event) => {
      expect(event.isDefaultPrevented()).to.not.be.ok;

      setTimeout(() => {
        expect(event.isDefaultPrevented()).to.not.be.ok;
        done();
      });
    };
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor href='#' onClick={handleClick} />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(anchor);
  });

  it('forwards provided role', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor role='test' />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.role.should.equal('test');
  });

  it('forwards provided role with href', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor role='test' href='http://google.com' />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.role.should.equal('test');
  });

  it('set role=button with no provided href', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    anchor.props.role.should.equal('button');
  });

  it('sets no role with provided href', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor href='http://google.com' />);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    expect(anchor.props.role).to.be.undefined;
  });
});
