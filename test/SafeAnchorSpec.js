import React from 'react';
import tsp from 'teaspoon';

import SafeAnchor from '../src/SafeAnchor';

describe('SafeAnchor', () => {
  it('renders an anchor tag', () => {
    tsp(<SafeAnchor />)
      .render()
      .dom()
      .tagName
      .should.equal('A');
  });

  it('forwards provided href', () => {
    tsp(<SafeAnchor href="http://google.com" />)
      .shallowRender()
      .find('a')
      .props('href')
      .should.equal('http://google.com');
  });

  it('ensures that an href is provided', () => {
    tsp(<SafeAnchor />)
      .render()
      .dom()
      .hasAttribute('href')
      .should.be.true;
  });

  it('forwards onClick handler', () => {
    const handleClick = sinon.spy();

    tsp(<SafeAnchor onClick={handleClick} />)
      .shallowRender()
      .find('a')
      .trigger('click', { preventDefault() {} });

    handleClick.should.have.been.calledOnce;
  });

  it('prevents default when no href is provided', () => {
    const handleClick = sinon.spy();

    tsp(<SafeAnchor onClick={handleClick} />)
      .render()
      .find('a')
        .trigger('click')
        .end()
      .props({ href: '#' })
      .find('a')
        .trigger('click');

    expect(handleClick).to.have.been.calledTwice;
    expect(handleClick.getCall(0).args[0].isDefaultPrevented()).to.be.true;
    expect(handleClick.getCall(1).args[0].isDefaultPrevented()).to.be.true;
  });

  it('does not prevent default when href is provided', () => {
    const handleClick = sinon.spy();

    tsp(<SafeAnchor href="#foo" onClick={handleClick} />)
      .render()
      .find('a')
      .trigger('click');

    expect(handleClick).to.have.been.calledOnce;
    expect(handleClick.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  it('Should disable link behavior', () => {
    let clickSpy = sinon.spy();
    let spy = sinon.spy(SafeAnchor.prototype, 'handleClick');

    tsp(
      <SafeAnchor disabled href="#foo" onClick={clickSpy}>
        Title
      </SafeAnchor>
    )
    .render()
    .trigger('click');

    expect(spy).to.have.been.calledOnce;
    expect(clickSpy).to.have.not.been.called;
    expect(spy.getCall(0).args[0].isDefaultPrevented()).to.equal(true);
    expect(spy.getCall(0).args[0].isPropagationStopped()).to.equal(true);
  });

  it('forwards provided role', () => {
    tsp(<SafeAnchor role="test" />)
      .shallowRender()
      .find('a')
      .props('role')
      .should.equal('test');
  });

  it('forwards provided role with href', () => {
    tsp(<SafeAnchor role="test" href="http://google.com" />)
      .shallowRender()
      .find('a')
      .props('role')
      .should.equal('test');
  });

  it('set role=button with no provided href', () => {
    tsp(<SafeAnchor />)
      .shallowRender()
      .find('a')
      .props('role')
      .should.equal('button');

    tsp(<SafeAnchor href="#" />)
      .shallowRender()
      .find('a')
      .props('role')
      .should.equal('button');
  });

  it('sets no role with provided href', () => {
    expect(
      tsp(<SafeAnchor href="http://google.com" />)
        .shallowRender()
        .find('a')
        .props('role')
    ).to.not.exist;
  });
});
