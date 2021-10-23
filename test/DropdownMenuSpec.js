import { mount } from 'enzyme';
import DropdownItem from '../src/DropdownItem';
import DropdownMenu, { getDropdownMenuPlacement } from '../src/DropdownMenu';

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

  it('applies align="end"', () => {
    mount(
      <DropdownMenu show align="end">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu-end');
  });

  it('renders on mount with prop', () => {
    mount(
      <DropdownMenu renderOnMount>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('div.dropdown-menu');
  });

  it('does not add any extra classes when align="start"', () => {
    const wrapper = mount(
      <DropdownMenu show align="start">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).find('DropdownMenu');

    expect(wrapper.getDOMNode().className).to.equal('dropdown-menu show');
  });

  it('adds right align class when align="end"', () => {
    mount(
      <DropdownMenu show align="end">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu-end');
  });

  it('adds responsive start alignment classes', () => {
    mount(
      <DropdownMenu show align={{ lg: 'start' }}>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    )
      .assertSingle('.dropdown-menu-end')
      .assertSingle('.dropdown-menu-lg-start');
  });

  it('adds responsive end alignment classes', () => {
    mount(
      <DropdownMenu show align={{ lg: 'end' }}>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    )
      .assertSingle('.dropdown-menu-lg-end')
      .assertSingle('[data-bs-popper="static"]');
  });

  it('should render variant', () => {
    mount(
      <DropdownMenu show variant="dark">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu.dropdown-menu-dark');
  });

  describe('getDropdownMenuPlacement', () => {
    it('should return top placement', () => {
      getDropdownMenuPlacement(false, 'up', false).should.equal('top-start');
      getDropdownMenuPlacement(true, 'up', false).should.equal('top-end');
    });

    it('should return top placement for RTL', () => {
      getDropdownMenuPlacement(false, 'up', true).should.equal('top-end');
      getDropdownMenuPlacement(true, 'up', true).should.equal('top-start');
    });

    it('should return end placement', () => {
      getDropdownMenuPlacement(false, 'end', false).should.equal('right-start');
      getDropdownMenuPlacement(true, 'end', false).should.equal('right-end');
    });

    it('should return end placement for RTL', () => {
      getDropdownMenuPlacement(false, 'end', true).should.equal('left-start');
      getDropdownMenuPlacement(true, 'end', true).should.equal('left-end');
    });

    it('should return bottom placement', () => {
      getDropdownMenuPlacement(false, 'bottom', false).should.equal(
        'bottom-start',
      );
      getDropdownMenuPlacement(true, 'bottom', false).should.equal(
        'bottom-end',
      );
    });

    it('should return bottom placement for RTL', () => {
      getDropdownMenuPlacement(false, 'bottom', true).should.equal(
        'bottom-end',
      );
      getDropdownMenuPlacement(true, 'bottom', true).should.equal(
        'bottom-start',
      );
    });

    it('should return start placement', () => {
      getDropdownMenuPlacement(false, 'start', false).should.equal(
        'left-start',
      );
      getDropdownMenuPlacement(true, 'start', false).should.equal('left-end');
    });

    it('should return start placement for RTL', () => {
      getDropdownMenuPlacement(false, 'start', true).should.equal(
        'right-start',
      );
      getDropdownMenuPlacement(true, 'start', true).should.equal('right-end');
    });
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
