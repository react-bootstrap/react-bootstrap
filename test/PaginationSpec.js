import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Pagination from '../src/Pagination';

describe('Pagination', () => {
  it('Should have class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination>Item content</Pagination>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pagination'));
  });

  it('Should show the correct active button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        items={5}
        activePage={3} />
    );
    let pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons.length, 5);
    React.findDOMNode(pageButtons[2]).className.should.match(/\bactive\b/);
  });

  it('Should call onSelect when page button is selected', (done) => {
    function onSelect(event, selectedEvent) {
      assert.equal(selectedEvent.eventKey, 2);
      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} onSelect={onSelect} />
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a')[1]
    );
  });

  it('Should only show part of buttons and active button in the middle of buttons when given maxButtons', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        items={30}
        activePage={10}
        maxButtons={9} />
    );
    let pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // 9 visible page buttons and 1 ellipsis button
    assert.equal(pageButtons.length, 10);

    // active button is the second one
    assert.equal(React.findDOMNode(pageButtons[0]).firstChild.innerText, '6');
    React.findDOMNode(pageButtons[4]).className.should.match(/\bactive\b/);
  });

  it('Should show the ellipsis, first, last, prev and next button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first={true}
        last={true}
        prev={true}
        next={true}
        maxButtons={3}
        activePage={10}
        items={20} />
    );
    let pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    // add first, last, prev, next and ellipsis button
    assert.equal(pageButtons.length, 8);

    assert.equal(React.findDOMNode(pageButtons[0]).innerText, '«');
    assert.equal(React.findDOMNode(pageButtons[1]).innerText, '‹');
    assert.equal(React.findDOMNode(pageButtons[5]).innerText, '...');
    assert.equal(React.findDOMNode(pageButtons[6]).innerText, '›');
    assert.equal(React.findDOMNode(pageButtons[7]).innerText, '»');

  });

  it('Should enumerate pagenums correctly when ellipsis=true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        first
        last
        prev
        next
        ellipsis
        maxButtons={5}
        activePage={1}
        items={1} />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(React.findDOMNode(pageButtons[0]).innerText, '«');
    assert.equal(React.findDOMNode(pageButtons[1]).innerText, '‹');
    assert.equal(React.findDOMNode(pageButtons[2]).innerText, '1');
    assert.equal(React.findDOMNode(pageButtons[3]).innerText, '›');
    assert.equal(React.findDOMNode(pageButtons[4]).innerText, '»');
  });

  it('Should render next and last buttons as disabled when items=0 and ellipsis=true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        last
        next
        ellipsis
        maxButtons={1}
        activePage={1}
        items={0} />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    assert.equal(React.findDOMNode(pageButtons[0]).innerText, '›');
    assert.equal(React.findDOMNode(pageButtons[1]).innerText, '»');

    assert.include(React.findDOMNode(pageButtons[0]).className, 'disabled');
    assert.include(React.findDOMNode(pageButtons[1]).className, 'disabled');
  });

  it('Should wrap buttons in SafeAnchor when no buttonComponentClass prop is supplied', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        maxButtons={2}
        activePage={1}
        items={2} />
    );
    let pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    let tagName = 'A';

    assert.equal(React.findDOMNode(pageButtons[0]).children[0].tagName, tagName);
    assert.equal(React.findDOMNode(pageButtons[1]).children[0].tagName, tagName);

    assert.equal(React.findDOMNode(pageButtons[0]).children[0].getAttribute('href'), '');
    assert.equal(React.findDOMNode(pageButtons[1]).children[0].getAttribute('href'), '');
  });

  it('Should wrap each button in a buttonComponentClass when it is present', () => {
    class DummyElement extends React.Component {
      render() {
        return <div {...this.props}/>;
      }
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        maxButtons={2}
        activePage={1}
        items={2}
        buttonComponentClass={DummyElement} />
    );
    let pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    let tagName = 'DIV';

    assert.equal(React.findDOMNode(pageButtons[0]).children[0].tagName, tagName);
    assert.equal(React.findDOMNode(pageButtons[1]).children[0].tagName, tagName);
  });

  it('Should call onSelect with custom buttonComponentClass', (done) => {
    class DummyElement extends React.Component {
      render() {
        return <div {...this.props}/>;
      }
    }

    function onSelect(event, selectedEvent) {
      assert.equal(selectedEvent.eventKey, 3);
      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} onSelect={onSelect} buttonComponentClass={DummyElement}/>
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
        items={0} />
    );
    const liElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    // buttons are disabled
    assert.include(React.findDOMNode(liElements[0]).className, 'disabled');
    assert.include(React.findDOMNode(liElements[1]).className, 'disabled');

    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    const nextButton = pageButtons[0];
    const lastButton = pageButtons[1];

    ReactTestUtils.Simulate.click( nextButton );
    ReactTestUtils.Simulate.click( lastButton );
  });
});
