import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination>Item content</Pagination>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pagination'));
  });

  it('should show the correct active button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        items={5}
        activePage={3}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons.length, 5);
    pageButtons[2].className.should.match(/\bactive\b/);
  });

  it('should call onSelect when page button is selected', (done) => {
    function onSelect(eventKey) {
      assert.equal(eventKey, 2);
      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} onSelect={onSelect} />
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a')[1]
    );
  });

  it('should only show part of buttons and active button in the middle of buttons when given maxButtons', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        items={30}
        activePage={10}
        maxButtons={9}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // 9 visible page buttons and 1 ellipsis button
    assert.equal(pageButtons.length, 10);

    // active button is the second one
    assert.equal(pageButtons[0].firstChild.textContent, '6');
    pageButtons[4].className.should.match(/\bactive\b/);
  });

  it('should show the ellipsis, boundaryLinks, first, last, prev and next button with default labels', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        ellipsis
        maxButtons={3}
        activePage={10}
        items={20}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // add first, last, prev, next and ellipsis button
    assert.equal(pageButtons.length, 8);

    assert.equal(pageButtons[0].textContent, '«');
    assert.equal(pageButtons[1].textContent, '‹');
    assert.equal(pageButtons[5].textContent, '…');
    assert.equal(pageButtons[6].textContent, '›');
    assert.equal(pageButtons[7].textContent, '»');

  });

  it('should show the boundaryLinks, first, last, prev and next button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        ellipsis
        boundaryLinks
        maxButtons={3}
        activePage={10}
        items={20}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // add first, last, prev, next and ellipsis button
    assert.equal(pageButtons[2].textContent, '1');
    assert.equal(pageButtons[3].textContent, '…');
    assert.equal(pageButtons[7].textContent, '…');
    assert.equal(pageButtons[8].textContent, '20');
  });

  it('should not render ellipsis with boundaryLinks near start', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        boundaryLinks
        maxButtons={5}
        activePage={4}
        items={20}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons[3].textContent, '2');
  });

  it('should not render ellipsis with boundaryLinks near end', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        boundaryLinks
        maxButtons={5}
        activePage={17}
        items={20}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons[pageButtons.length - 4].textContent, '19');
  });

  it('should show the ellipsis, first, last, prev and next button with custom labels', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first="first"
        last="last"
        prev="prev"
        next="next"
        ellipsis="more"
        maxButtons={3}
        activePage={10}
        items={20}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // add first, last, prev, next and ellipsis button
    assert.equal(pageButtons.length, 8);

    assert.equal(pageButtons[0].textContent, 'first');
    assert.equal(pageButtons[1].textContent, 'prev');
    assert.equal(pageButtons[5].textContent, 'more');
    assert.equal(pageButtons[6].textContent, 'next');
    assert.equal(pageButtons[7].textContent, 'last');
  });

  it('should enumerate pagenums correctly when ellipsis=true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        ellipsis
        maxButtons={5}
        activePage={1}
        items={1}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].textContent, '«');
    assert.equal(pageButtons[1].textContent, '‹');
    assert.equal(pageButtons[2].textContent, '1');
    assert.equal(pageButtons[3].textContent, '›');
    assert.equal(pageButtons[4].textContent, '»');
  });

  it('should render next and last buttons as disabled when items=0 and ellipsis=true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        last
        next
        ellipsis
        maxButtons={1}
        activePage={1}
        items={0}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].textContent, '›');
    assert.equal(pageButtons[1].textContent, '»');

    assert.include(pageButtons[0].className, 'disabled');
    assert.include(pageButtons[1].className, 'disabled');
  });

  it('should wrap buttons in SafeAnchor when no buttonComponentClass prop is supplied', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        maxButtons={2}
        activePage={1}
        items={2}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].children[0].tagName, 'A');
    assert.equal(pageButtons[1].children[0].tagName, 'A');

    assert.equal(pageButtons[0].children[0].getAttribute('href'), '#');
    assert.equal(pageButtons[1].children[0].getAttribute('href'), '#');
  });

  it('should wrap each button in a buttonComponentClass when it is present', () => {
    class DummyElement extends React.Component {
      render() {
        return <div>{this.props.children}</div>;
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        maxButtons={2}
        activePage={1}
        items={2}
        buttonComponentClass={DummyElement}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].children[0].tagName, 'DIV');
    assert.equal(pageButtons[1].children[0].tagName, 'DIV');
  });

  it('should call onSelect with custom buttonComponentClass', (done) => {
    class DummyElement extends React.Component {
      render() {
        return <div onClick={this.props.onClick} />;
      }
    }

    function onSelect(eventKey) {
      assert.equal(eventKey, 3);
      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} onSelect={onSelect} buttonComponentClass={DummyElement} />
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[2]
    );
  });

  it('should not fire "onSelect" event on disabled buttons', () => {
    function onSelect() {
      throw Error('this event should not happen');
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        onSelect={onSelect}
        last
        next
        ellipsis
        maxButtons={1}
        activePage={1}
        items={0}
      />
    );
    const liElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    // buttons are disabled
    assert.include(liElements[0].className, 'disabled');
    assert.include(liElements[1].className, 'disabled');

    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    const nextButton = pageButtons[0];
    const lastButton = pageButtons[1];

    ReactTestUtils.Simulate.click(nextButton);
    ReactTestUtils.Simulate.click(lastButton);
  });

  it('should pass page number to buttonComponentClass', () => {
    class DummyElement extends React.Component {
      render() {
        return (
          <a href={`?page=${this.props.eventKey}`}>
            {this.props.eventKey}
          </a>
        );
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} buttonComponentClass={DummyElement} />
    );

    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');

    assert.equal(pageButtons[1].getAttribute('href'), '?page=2');
  });

  it('should render three items from 1 to 3 when activePage=1', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={4} maxButtons={3} activePage={1} />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].textContent, '1');
    assert.equal(pageButtons[1].textContent, '2');
    assert.equal(pageButtons[2].textContent, '3');
  });

  it('should render three items from 2 to 4 when activePage=3', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        onSelect={()=>{}}
        items={4}
        maxButtons={3}
        activePage={3} />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(pageButtons[0].textContent, '2');
    assert.equal(pageButtons[1].textContent, '3');
    assert.equal(pageButtons[2].textContent, '4');
  });
});
