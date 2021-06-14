import { mount } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';
import simulant from 'simulant';
import sinon from 'sinon';
import Dropdown from '../src/Dropdown';
import InputGroup from '../src/InputGroup';

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle id="test-id" key="toggle">
      Child Title
    </Dropdown.Toggle>,
    <Dropdown.Menu key="menu">
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = <Dropdown>{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', () => {
    mount(simpleDropdown).assertSingle('div.dropdown');
  });

  it('renders div with dropup class', () => {
    mount(simpleDropdown).assertSingle('div.dropdown');

    const node = mount(
      <Dropdown title="Dropup" drop="up">
        {dropdownChildren}
      </Dropdown>,
    ).getDOMNode();

    node.tagName.should.equal('DIV');
    node.className.should.not.match(/\bdropdown\b/);
    node.className.should.match(/\bdropup\b/);
  });

  it('renders div with dropend class', () => {
    mount(
      <Dropdown title="Dropend" drop="end">
        {dropdownChildren}
      </Dropdown>,
    ).assertSingle('.dropend');
  });

  it('renders div with dropstart class', () => {
    mount(
      <Dropdown title="Dropstart" drop="start">
        {dropdownChildren}
      </Dropdown>,
    ).assertSingle('.dropstart');
  });

  it('renders toggle with Dropdown.Toggle', () => {
    const buttonNode = mount(simpleDropdown)
      .find('DropdownToggle')
      .assertSingle('button.dropdown-toggle.btn-primary[type="button"]')
      .getDOMNode();

    buttonNode.textContent.should.match(/Child Title/);

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('forwards align="end" to menu', () => {
    const Menu = React.forwardRef(
      ({ show: _, close: _1, align, ...props }, ref) => (
        <div {...props} data-align={align} ref={ref} />
      ),
    );

    mount(
      <Dropdown align="end" show>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>

        <Dropdown.Menu key="menu" as={Menu}>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    ).assertSingle('div[data-align="end"]');
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', () => {
    const wrapper = mount(simpleDropdown);

    wrapper.assertNone('.show');
    wrapper.assertSingle('button[aria-expanded=false]').simulate('click');

    wrapper.assertSingle('.dropdown.show');
    wrapper.assertSingle('.dropdown-menu.show');

    wrapper.assertSingle('button[aria-expanded=true]').simulate('click');

    wrapper.assertNone('.show');

    wrapper.assertSingle('button[aria-expanded=false]');
  });

  it('does not pass onSelect to DOM node', () => {
    expect(
      mount(simpleDropdown)
        .setProps({ onSelect: () => {} })
        .find('div.dropdown')
        .prop('onSelect'),
    ).to.not.exist;
  });

  it('closes when child Dropdown.Item is selected', () => {
    const onToggle = sinon.spy();

    const wrapper = mount(simpleDropdown).setProps({ show: true, onToggle });

    wrapper.assertSingle('.dropdown.show');

    wrapper.find('.dropdown-menu a').first().simulate('click');

    onToggle.should.have.been.calledWith(false);
  });

  it('has aria-labelledby same id as toggle button', () => {
    const wrapper = mount(
      React.cloneElement(simpleDropdown, { defaultShow: true }),
    );

    wrapper
      .find('button')
      .getDOMNode()
      .getAttribute('id')
      .should.equal(
        wrapper
          .find('div.dropdown-menu')
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      );
  });

  it('chains refs', () => {
    class RefDropdown extends React.Component {
      render() {
        return (
          <Dropdown
            defaultShow
            ref={(dropdown) => {
              this.dropdown = dropdown;
            }}
            id="test"
          >
            <Dropdown.Toggle
              id="test-id"
              ref={(toggle) => (this.toggle = toggle)}
            />
            <Dropdown.Menu ref={(menu) => (this.menu = menu)} />
          </Dropdown>
        );
      }
    }

    let inst = mount(<RefDropdown />).instance();

    inst.menu.should.exist;
    inst.toggle.should.exist;
  });

  describe('DOM event and source passed to onToggle', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('passes open, event, and source correctly when opened with click', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown onToggle={spy}>{dropdownChildren}</Dropdown>,
      );

      expect(spy).to.not.have.been.called;

      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when closed with click', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown onToggle={spy}>{dropdownChildren}</Dropdown>,
      );

      expect(spy).to.not.have.been.called;

      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.calledOnce;

      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when child selected', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown onToggle={spy}>
          <Dropdown.Toggle id="test-id">Child Title</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1}>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      expect(spy).to.not.have.been.called;
      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.calledOnce;

      wrapper.find('a').first().simulate('click');

      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'select' });
    });

    it('passes open, event, and source correctly when opened with keydown', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown onToggle={spy}>{dropdownChildren}</Dropdown>,
        { attachTo: focusableContainer },
      );

      simulant.fire(wrapper.find('button').getDOMNode(), 'keydown', {
        key: 'ArrowDown',
      });

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('event');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'keydown' });
    });
  });

  it('should use each components bsPrefix', () => {
    const wrapper = mount(
      <Dropdown defaultShow bsPrefix="my-dropdown">
        <Dropdown.Toggle id="test-id" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    wrapper.assertSingle('div.my-dropdown');
    wrapper.assertSingle('button.my-toggle');
    wrapper.assertSingle('div.my-menu');
  });

  it('Should have div as default component', () => {
    const wrapper = mount(<Dropdown />);
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('Should also accept a custom component', () => {
    const customComponent = React.forwardRef(
      (
        {
          // eslint-disable-next-line no-unused-vars
          show,
          // eslint-disable-next-line no-unused-vars
          close,
          ...props
        },
        ref,
      ) => <div ref={ref} id="custom-component" {...props} />,
    );
    mount(
      <Dropdown.Menu show as={customComponent}>
        <Dropdown.Item>Example Item</Dropdown.Item>
      </Dropdown.Menu>,
    ).assertSingle('#custom-component');
  });

  describe('InputGroup Dropdowns', () => {
    it('should not render a .dropdown element when inside input group', () => {
      const wrapper = mount(
        <InputGroup>
          <Dropdown>{dropdownChildren}</Dropdown>
        </InputGroup>,
      );

      expect(wrapper.find('.dropdown').length).to.equal(0);
    });

    it('should render .show on the dropdown toggle', () => {
      mount(
        <InputGroup>
          <Dropdown show>{dropdownChildren}</Dropdown>
        </InputGroup>,
      ).assertSingle('button.dropdown-toggle.show');
    });

    it('should always render dropdown menu even if renderOnMount=false', () => {
      mount(
        <InputGroup>
          <Dropdown renderOnMount={false}>{dropdownChildren}</Dropdown>
        </InputGroup>,
      ).assertSingle('div.dropdown-menu');
    });
  });

  describe('autoClose behaviour', () => {
    describe('autoClose="true"', () => {
      it('should close on outer click', () => {
        const onToggle = sinon.spy();

        mount(simpleDropdown).setProps({
          show: true,
          autoClose: true,
          onToggle,
        });

        simulant.fire(document.body, 'click');

        onToggle.should.have.been.calledWith(false);
      });
    });

    describe('autoClose="inside"', () => {
      it('should close on child selection', () => {
        const onToggle = sinon.spy();

        const wrapper = mount(simpleDropdown).setProps({
          show: true,
          autoClose: 'inside',
          onToggle,
        });

        wrapper.find('.dropdown-menu a').first().simulate('click');

        onToggle.should.have.been.calledWith(false);
      });

      it('should not close on outer click', () => {
        let wrapper = mount(simpleDropdown).setProps({
          show: true,
          autoClose: 'inside',
        });

        simulant.fire(document.body, 'click');

        expect(wrapper.find('Dropdown').prop('show')).to.be.true;
      });
    });

    describe('autoClose="outside"', () => {
      it('should not close on child selection', () => {
        const onToggle = sinon.spy();

        const wrapper = mount(simpleDropdown).setProps({
          show: true,
          autoClose: 'outside',
          onToggle,
        });

        wrapper.find('.dropdown-menu a').first().simulate('click');

        sinon.assert.notCalled(onToggle);
      });

      it('should close on outer click', () => {
        const onToggle = sinon.spy();

        mount(simpleDropdown).setProps({
          show: true,
          autoClose: 'outside',
          onToggle,
        });

        simulant.fire(document.body, 'click');

        onToggle.should.be.calledWith(false);
      });
    });

    describe('autoClose="false"', () => {
      it('should not close on child selection', () => {
        const onToggle = sinon.spy();

        const wrapper = mount(simpleDropdown).setProps({
          show: true,
          autoClose: false,
          onToggle,
        });

        wrapper.find('.dropdown-menu a').first().simulate('click');

        sinon.assert.notCalled(onToggle);
      });

      it('should not close on outer click', () => {
        const onToggle = sinon.spy();

        mount(simpleDropdown).setProps({
          show: true,
          autoClose: false,
          onToggle,
        });

        simulant.fire(document.body, 'click');

        sinon.assert.notCalled(onToggle);
      });
    });
  });
});
