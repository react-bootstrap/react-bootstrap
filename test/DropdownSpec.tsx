import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { expect } from 'chai';
import * as React from 'react';

import Dropdown from '../src/Dropdown';
import { DropDirection } from '../src/DropdownContext';
import InputGroup from '../src/InputGroup';

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle id="test-id" key="toggle">
      Child Title
    </Dropdown.Toggle>,
    <Dropdown.Menu data-testid="menu" key="menu">
      <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = <Dropdown>{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', () => {
    const { container } = render(simpleDropdown);
    container.firstElementChild!.classList.should.contain(['dropdown']);
  });

  ['up', 'end', 'start'].forEach((dir: DropDirection) => {
    it(`renders div with drop${dir} class`, () => {
      const { container } = render(
        <Dropdown title="Dropup" drop={dir}>
          {dropdownChildren}
        </Dropdown>,
      );

      container.firstElementChild!.classList.should.not.contain(['dropdown']);
      container.firstElementChild!.classList.should.contain([`drop${dir}`]);
    });
  });

  it('renders toggle with Dropdown.Toggle', () => {
    const { getByText } = render(simpleDropdown);

    const toggle = getByText('Child Title');
    toggle.getAttribute('aria-expanded')!.should.equal('false');
    toggle.id.should.be.ok;
  });

  it('forwards align="end" to menu', () => {
    const Menu = React.forwardRef<any, any>(
      ({ show: _, close: _1, align, ...props }, ref) => (
        <div {...props} data-align={align} ref={ref} />
      ),
    );

    const { container } = render(
      <Dropdown align="end" show>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>

        <Dropdown.Menu key="menu" as={Menu}>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    container.querySelector('[data-align="end"]')!.should.exist;
  });

  it('toggles open/closed when clicked', () => {
    const { container, getByText, getByTestId } = render(simpleDropdown);
    const dropdown = container.firstElementChild!;
    const toggle = getByText('Child Title');

    dropdown.classList.should.not.contain(['show']);
    fireEvent.click(toggle);
    dropdown.classList.should.contain(['show']);

    getByTestId('menu').classList.should.contain(['dropdown-menu', 'show']);

    fireEvent.click(toggle);
    dropdown.classList.should.not.contain(['show']);
    toggle.getAttribute('aria-expanded')!.should.equal('false');
  });

  it('closes when child Dropdown.Item is selected', () => {
    const onToggleSpy = sinon.spy();

    const { container, getByTestId } = render(
      <Dropdown show onToggle={onToggleSpy}>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    container.firstElementChild!.classList.should.contain(['show']);

    fireEvent.click(getByTestId('item1'));
    onToggleSpy.should.have.been.calledWith(false);
  });

  it('has aria-labelledby same id as toggle button', () => {
    const { getByTestId } = render(
      <Dropdown show>
        <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    getByTestId('toggle').id.should.equal(
      getByTestId('menu').getAttribute('aria-labelledby'),
    );
  });

  describe('DOM event and source passed to onToggle', () => {
    it('passes open, event, and source correctly when opened with click', () => {
      const onToggleSpy = sinon.spy();
      const { getByText } = render(
        <Dropdown onToggle={onToggleSpy}>{dropdownChildren}</Dropdown>,
      );

      onToggleSpy.should.not.have.been.called;

      fireEvent.click(getByText('Child Title'));

      onToggleSpy.should.have.been.calledOnce;
      onToggleSpy.getCall(0).args.length.should.equal(2);
      onToggleSpy.getCall(0).args[0].should.equal(true);
      onToggleSpy.getCall(0).args[1].source.should.equal('click');
    });

    it('passes open, event, and source correctly when closed with click', () => {
      const onToggleSpy = sinon.spy();
      const { getByText } = render(
        <Dropdown show onToggle={onToggleSpy}>
          {dropdownChildren}
        </Dropdown>,
      );

      const toggle = getByText('Child Title');

      onToggleSpy.should.not.have.been.called;

      fireEvent.click(toggle);

      onToggleSpy.getCall(0).args.length.should.equal(2);
      onToggleSpy.getCall(0).args[0].should.equal(false);
      onToggleSpy.getCall(0).args[1].source.should.equal('click');
    });

    it('passes open, event, and source correctly when child selected', () => {
      const onToggleSpy = sinon.spy();
      const { getByTestId } = render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.click(getByTestId('toggle'));

      onToggleSpy.should.have.been.called;

      fireEvent.click(getByTestId('item1'));

      onToggleSpy.should.have.been.calledTwice;
      onToggleSpy.getCall(1).args.length.should.equal(2);
      onToggleSpy.getCall(1).args[0].should.equal(false);
      onToggleSpy.getCall(1).args[1].source.should.equal('select');
    });

    it('passes open, event, and source correctly when opened with keydown', () => {
      const onToggleSpy = sinon.spy();
      const { getByTestId } = render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.keyDown(getByTestId('toggle'), { key: 'ArrowDown' });

      onToggleSpy.should.have.been.calledOnce;
      onToggleSpy.getCall(0).args.length.should.equal(2);
      onToggleSpy.getCall(0).args[0].should.equal(true);
      onToggleSpy.getCall(0).args[1].source.should.equal('keydown');
    });
  });

  it('should use each components bsPrefix', () => {
    const { getByTestId } = render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    getByTestId('dropdown').classList.should.contain(['show', 'my-dropdown']);
    getByTestId('toggle').classList.should.contain(['my-toggle']);
    getByTestId('menu').classList.should.contain(['my-menu']);
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    getByTestId('dropdown').tagName.should.equal('DIV');
  });

  it('Should also accept a custom component', () => {
    const customComponent = React.forwardRef<any, any>(
      (
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          show,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          close,
          ...props
        },
        ref,
      ) => <div ref={ref} id="custom-component" {...props} />,
    );
    const { getByTestId } = render(
      <Dropdown.Menu data-testid="menu" show as={customComponent}>
        <Dropdown.Item>Example Item</Dropdown.Item>
      </Dropdown.Menu>,
    );

    getByTestId('menu').id.should.equal('custom-component');
  });

  describe('InputGroup Dropdowns', () => {
    it('should not render a .dropdown element when inside input group', () => {
      const { queryByTestId } = render(
        <InputGroup>
          <Dropdown data-testid="dropdown">{dropdownChildren}</Dropdown>
        </InputGroup>,
      );

      expect(queryByTestId('dropdown')!).not.to.exist;
    });

    it('should render .show on the dropdown toggle', () => {
      const { getByText } = render(
        <InputGroup>
          <Dropdown show>{dropdownChildren}</Dropdown>
        </InputGroup>,
      );

      getByText('Child Title').classList.contains('show').should.be.true;
    });
  });

  describe('autoClose behaviour', () => {
    describe('autoClose="true"', () => {
      it('should close on outer click', () => {
        const onToggleSpy = sinon.spy();

        render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        onToggleSpy.should.have.been.calledWith(false);
      });
    });

    describe('autoClose="inside"', () => {
      it('should close on child selection', () => {
        const onToggleSpy = sinon.spy();

        const { getByTestId } = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(getByTestId('item1'));

        onToggleSpy.should.have.been.calledWith(false);
      });

      it('should not close on outer click', () => {
        const onToggleSpy = sinon.spy();

        render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        onToggleSpy.should.not.have.been.called;
      });
    });

    describe('autoClose="outside"', () => {
      it('should not close on child selection', () => {
        const onToggleSpy = sinon.spy();

        const { getByTestId } = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(getByTestId('item1'));

        onToggleSpy.should.not.have.been.called;
      });

      it('should close on outer click', () => {
        const onToggleSpy = sinon.spy();

        render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        onToggleSpy.should.be.calledWith(false);
      });
    });

    describe('autoClose="false"', () => {
      it('should not close on child selection', () => {
        const onToggleSpy = sinon.spy();

        const { getByTestId } = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(getByTestId('item1'));

        onToggleSpy.should.not.have.been.called;
      });

      it('should not close on outer click', () => {
        const onToggleSpy = sinon.spy();

        render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        onToggleSpy.should.not.have.been.called;
      });
    });
  });
});
