import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import Tab from '../src/Tab';
import Tabs from '../src/Tabs';

import { shouldWarn } from './helpers';

const checkEventKey = (elem: Element, eventKey: string | number) =>
  elem.getAttribute('data-rr-ui-event-key') === `${eventKey}` &&
  elem.getAttribute('id') === `test-tab-${eventKey}` &&
  elem.getAttribute('aria-controls') === `test-tabpane-${eventKey}`;

describe('<Tabs>', () => {
  it('Should show the correct tab and assign correct eventKeys', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabButton = getByText('Tab 1 title');
    const firstTabContent = getByText('Tab 1 content');
    const secondTabButton = getByText('Tab 2 title');

    firstTabButton.tagName.toLowerCase().should.equal('button');
    firstTabButton.classList.contains('active').should.be.true;
    firstTabContent.classList.contains('active').should.be.true;

    secondTabButton.classList.contains('active').should.be.false;
    secondTabButton.tagName.toLowerCase().should.equal('button');

    checkEventKey(firstTabButton, 1).should.be.true;
    checkEventKey(secondTabButton, 2).should.be.true;
  });

  it('should get defaultActiveKey (if null) from first child tab with eventKey', () => {
    const { getByText } = render(
      <Tabs id="test" data-testid="test-id">
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    const firstTabButton = getByText('Tab 1 title');
    const firstTabContent = getByText('Tab 1 content');
    const secondTabButton = getByText('Tab 2 title');

    firstTabButton.tagName.toLowerCase().should.equal('button');
    firstTabButton.classList.contains('active').should.be.true;
    firstTabContent.classList.contains('active').should.be.true;

    secondTabButton.classList.contains('active').should.be.false;
    secondTabButton.tagName.toLowerCase().should.equal('button');
  });

  it('Should allow tab title to have React components', () => {
    const tabTitle = <strong className="special-tab">React Tab 2</strong>;

    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    getByText('React Tab 2').classList.contains('special-tab').should.be.true;
  });

  it('Should call onSelect when tab is selected', () => {
    const onSelect = (key) => {
      key.should.equal('2');
    };
    const onSelectSpy = sinon.spy(onSelect);

    const { getByText } = render(
      <Tabs id="test" onSelect={onSelectSpy} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    fireEvent.click(getByText('Tab 2'));
    onSelectSpy.should.have.been.called;
  });

  it('Should have children with the correct DOM properties', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabContent = getByText('Tab 1 content');
    const secondTabContent = getByText('Tab 2 content');

    const firstTabTitle = getByText('Tab 1');
    const secondTabTitle = getByText('Tab 2');

    firstTabContent.classList.contains('custom').should.be.true;
    secondTabContent.classList.contains('tcustom').should.be.false;

    firstTabTitle.classList.contains('custom').should.be.false;
    secondTabTitle.classList.contains('tcustom').should.be.true;
  });

  it('Should pass variant to Nav', () => {
    const { getByTestId } = render(
      <Tabs
        data-testid="test"
        variant="pills"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    getByTestId('test').classList.contains('nav-pills').should.be.true;
  });

  it('Should pass disabled to Nav', () => {
    const onSelect = (e) => e;
    const onSelectSpy = sinon.spy(onSelect);

    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1} onSelect={onSelectSpy}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const secondTabTitle = getByText('Tab 2');
    secondTabTitle.classList.contains('disabled').should.be.true;

    onSelectSpy.should.not.have.been.called;
  });

  it('Should not render a Tab without a title', () => {
    shouldWarn('Failed prop');
    const { getByTestId } = render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        {/* @ts-ignore */}
        <Tab eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const tabs = getByTestId('testid');
    tabs.children.should.have.length(1);
  });

  it('Should render TabPane with role="tabpanel"', () => {
    const { getAllByRole } = render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
      </Tabs>,
    );

    getAllByRole('tabpanel').should.have.length(1);
  });

  it('should have fade animation by default', () => {
    const { getByRole } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
      </Tabs>,
    );
    getByRole('tabpanel').classList.contains('fade').should.be.true;
  });

  it('Should omit Transition in TabPane if prop is false ', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1} transition={false}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabContent = getByText('Tab 1 content');
    const secondTabContent = getByText('Tab 2 content');

    firstTabContent.classList.contains('fade').should.be.false;
    secondTabContent.classList.contains('fade').should.be.true;
  });

  it('Should pass fill to Nav', () => {
    const { getByTestId } = render(
      <Tabs data-testid="test" defaultActiveKey={1} transition={false} fill>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    getByTestId('test').classList.contains('nav-fill').should.be.true;
  });

  it('Should pass justified to Nav', () => {
    const { getByTestId } = render(
      <Tabs data-testid="test" defaultActiveKey={1} transition={false} justify>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    getByTestId('test').classList.contains('nav-justified').should.be.true;
  });
});

// describe('<Tab>', () => {
//   it('should throw error message on attempt to render', () => {
//     expect(() =>
//       render(
//         <Tab title="Tab 1" eventKey={1}>
//           Tab 1 content
//         </Tab>,
//       ),
//     ).to.throw();
//   });
// });
