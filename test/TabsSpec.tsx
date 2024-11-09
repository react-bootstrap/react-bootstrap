import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Tab from '../src/Tab';
import Tabs from '../src/Tabs';

const checkEventKey = (elem: Element, eventKey: string | number) =>
  elem.getAttribute('data-rr-ui-event-key') === `${eventKey}` &&
  elem.getAttribute('id') === `test-tab-${eventKey}` &&
  elem.getAttribute('aria-controls') === `test-tabpane-${eventKey}`;

describe('<Tabs>', () => {
  it('Should show the correct tab and assign correct eventKeys', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabButton = screen.getByText('Tab 1 title');
    const firstTabContent = screen.getByText('Tab 1 content');
    const secondTabButton = screen.getByText('Tab 2 title');

    expect(firstTabButton.tagName).toEqual('BUTTON');
    expect(firstTabButton.classList).toContain('active');
    expect(firstTabContent.classList).toContain('active');

    expect(secondTabButton.classList).not.toContain('active');
    expect(secondTabButton.tagName).toEqual('BUTTON');

    expect(checkEventKey(firstTabButton, 1)).toEqual(true);
    expect(checkEventKey(secondTabButton, 2)).toEqual(true);
  });

  it('should get defaultActiveKey (if null) from first child tab with eventKey', () => {
    render(
      <Tabs id="test" data-testid="test-id">
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    const firstTabButton = screen.getByText('Tab 1 title');
    const firstTabContent = screen.getByText('Tab 1 content');
    const secondTabButton = screen.getByText('Tab 2 title');

    expect(firstTabButton.tagName).toEqual('BUTTON');
    expect(firstTabButton.classList).toContain('active');
    expect(firstTabContent.classList).toContain('active');

    expect(secondTabButton.classList).not.toContain('active');
    expect(secondTabButton.tagName).toEqual('BUTTON');
  });

  it('Should allow tab title to have React components', () => {
    const tabTitle = <strong className="special-tab">React Tab 2</strong>;

    render(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    expect(screen.getByText('React Tab 2').classList).toContain('special-tab');
  });

  it('Should call onSelect when tab is selected', () => {
    const onSelectSpy = vi.fn();

    render(
      <Tabs id="test" onSelect={onSelectSpy} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    fireEvent.click(screen.getByText('Tab 2'));
    expect(onSelectSpy).toHaveBeenCalledWith('2', expect.anything());
  });

  it('Should have children with the correct DOM properties', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabContent = screen.getByText('Tab 1 content');
    const secondTabContent = screen.getByText('Tab 2 content');

    const firstTabTitle = screen.getByText('Tab 1');
    const secondTabTitle = screen.getByText('Tab 2');

    expect(firstTabContent.classList).toContain('custom');
    expect(secondTabContent.classList).not.toContain('tcustom');

    expect(firstTabTitle.classList).not.toContain('custom');
    expect(secondTabTitle.classList).toContain('tcustom');
  });

  it('Should pass variant to Nav', () => {
    render(
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

    expect(screen.getByTestId('test').classList).toContain('nav-pills');
  });

  it('Should pass disabled to Nav', () => {
    const onSelectSpy = vi.fn();

    render(
      <Tabs id="test" defaultActiveKey={1} onSelect={onSelectSpy}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const secondTabTitle = screen.getByText('Tab 2');
    expect(secondTabTitle.classList).toContain('disabled');

    expect(onSelectSpy).not.toHaveBeenCalled();
  });

  it('Should not render a Tab without a title', () => {
    render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        {/* @ts-ignore */}
        <Tab eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const tabs = screen.getByTestId('testid');
    expect(tabs.children).toHaveLength(1);
  });

  it('Should render TabPane with role="tabpanel"', () => {
    render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
      </Tabs>,
    );

    expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  });

  it('should have fade animation by default', () => {
    const { getByRole } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
      </Tabs>,
    );
    expect(getByRole('tabpanel').classList).toContain('fade');
  });

  it('Should omit Transition in TabPane if prop is false ', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1} transition={false}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );
    const firstTabContent = screen.getByText('Tab 1 content');
    const secondTabContent = screen.getByText('Tab 2 content');

    expect(firstTabContent.classList).not.toContain('fade');
    expect(secondTabContent.classList).toContain('fade');
  });

  it('Should pass fill to Nav', () => {
    render(
      <Tabs data-testid="test" defaultActiveKey={1} transition={false} fill>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    expect(screen.getByTestId('test').classList).toContain('nav-fill');
  });

  it('Should pass justified to Nav', () => {
    render(
      <Tabs data-testid="test" defaultActiveKey={1} transition={false} justify>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    );

    expect(screen.getByTestId('test').classList).toContain('nav-justified');
  });
});

describe('<Tab>', () => {
  it('should throw error message on attempt to render', () => {
    expect(() =>
      render(
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>,
      ),
    ).to.throw();
  });
});
