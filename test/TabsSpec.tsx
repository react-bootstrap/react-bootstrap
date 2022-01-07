import { render } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
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
      expect(key).to.equal('2');
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

    getByText('Tab 2').click();
    console.log(onSelectSpy);
    expect(onSelectSpy).to.have.been.called;
  });

  it('Should have children with the correct DOM properties', () => {
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    wrapper.assertSingle('button.nav-link.tcustom');
    wrapper.assertNone('button.nav-link.custom');
    wrapper.assertSingle('div.tab-pane.custom#test-tabpane-1');
  });

  it('Should pass variant to Nav', () => {
    mount(
      <Tabs id="test" variant="pills" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    ).assertSingle('ul.nav-pills');
  });

  it('Should pass disabled to Nav', () => {
    mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    ).assertSingle('button.nav-link.disabled');
  });

  it('Should not render a Tab without a title', () => {
    shouldWarn('Failed prop');
    mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    )
      .find('button.nav-link')
      .should.have.length(1);
  });
});

describe('<Tab>', () => {
  it('should throw error message on attempt to render', () => {
    expect(() =>
      shallow(
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>,
      ),
    ).to.throw();
  });
});
