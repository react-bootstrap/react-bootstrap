import { mount } from 'enzyme';
import React from 'react';
import DropdownItem from '../src/DropdownItem';
import DropdownMenu from '../src/DropdownMenu';

describe('<Dropdown.Menu>', () => {
  const simpleMenu = (
    <DropdownMenu show>
      <DropdownItem eventKey="1">Item 1</DropdownItem>
      <DropdownItem eventKey="2">Item 2</DropdownItem>
      <DropdownItem eventKey="3">Item 3</DropdownItem>
      <DropdownItem eventKey="4">Item 4</DropdownItem>
    </DropdownMenu>
  );

  it('renders div with dropdown-menu class', () => {
    mount(simpleMenu).assertSingle('div.dropdown-menu');
  });

  it('Should pass props to dropdown', () => {
    mount(
      <DropdownMenu show className="new-fancy-class">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('div.new-fancy-class');
  });

  it('applies alignRight', () => {
    mount(
      <DropdownMenu show alignRight>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu-right');
  });

  it('renders on mount with prop', () => {
    mount(
      <DropdownMenu renderOnMount>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('div.dropdown-menu');
  });

  it('does not add any extra classes when align="left"', () => {
    const wrapper = mount(
      <DropdownMenu show align="left">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).find('DropdownMenu');

    expect(wrapper.getDOMNode().className).to.equal('dropdown-menu show');
  });

  it('adds right align class when align="right"', () => {
    mount(
      <DropdownMenu show align="right">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu-right');
  });

  it('adds responsive left alignment classes', () => {
    mount(
      <DropdownMenu
        show
        align={{ sm: 'left', md: 'left', lg: 'left', xl: 'left' }}
      >
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    )
      .assertSingle('.dropdown-menu-right')
      .assertSingle('.dropdown-menu-sm-left')
      .assertSingle('.dropdown-menu-md-left')
      .assertSingle('.dropdown-menu-lg-left')
      .assertSingle('.dropdown-menu-xl-left');
  });

  it('adds responsive right alignment classes', () => {
    mount(
      <DropdownMenu
        show
        align={{ sm: 'right', md: 'right', lg: 'right', xl: 'right' }}
      >
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    )
      .assertSingle('.dropdown-menu-sm-right')
      .assertSingle('.dropdown-menu-md-right')
      .assertSingle('.dropdown-menu-lg-right')
      .assertSingle('.dropdown-menu-xl-right');
  });

  // it.only('warns about bad refs', () => {
  //   class Parent extends React.Component {
  //     componentDidCatch() {}

  //     render() {
  //       return this.props.children;
  //     }
  //   }

  //   class Menu extends React.Component {
  //     render() {
  //       const { show: _, alignRight: _1, close: _2, ...props } = this.props;

  //       return <div {...props} />;
  //     }
  //   }

  //   expect(() =>
  //     mount(
  //       <Parent>
  //         <DropdownMenu show as={Menu}>
  //           <DropdownItem>Item</DropdownItem>
  //         </DropdownMenu>
  //       </Parent>,
  //     ),
  //   ).to.throw();
  // });
});
