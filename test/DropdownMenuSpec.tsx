import { render } from '@testing-library/react';
import DropdownItem from '../src/DropdownItem';
import DropdownMenu, { getDropdownMenuPlacement } from '../src/DropdownMenu';

describe('<Dropdown.Menu>', () => {
  it('renders div with dropdown-menu class', () => {
    const { container } = render(
      <DropdownMenu show>
        <DropdownItem eventKey="1">Item 1</DropdownItem>
        <DropdownItem eventKey="2">Item 2</DropdownItem>
        <DropdownItem eventKey="3">Item 3</DropdownItem>
        <DropdownItem eventKey="4">Item 4</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu').should.be
      .true;
  });

  it('Should pass props to dropdown', () => {
    const { container } = render(
      <DropdownMenu show className="new-fancy-class">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('new-fancy-class').should.be
      .true;
  });

  it('applies align="end"', () => {
    const { container } = render(
      <DropdownMenu show align="end">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu-end').should
      .be.true;
  });

  it('renders on mount with prop', () => {
    const { container } = render(
      <DropdownMenu renderOnMount>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu').should.be
      .true;
  });

  it('does not add any extra classes when align="start"', () => {
    const { container } = render(
      <DropdownMenu show align="start">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.className.should.equal('dropdown-menu show');
  });

  it('adds responsive start alignment classes', () => {
    const { container } = render(
      <DropdownMenu show align={{ lg: 'start' }}>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );
    container.firstElementChild!.classList.contains('dropdown-menu-end').should
      .be.true;
    container.firstElementChild!.classList.contains('dropdown-menu-lg-start')
      .should.be.true;
  });

  it('adds responsive end alignment classes', () => {
    const { container } = render(
      <DropdownMenu show align={{ lg: 'end' }}>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu-lg-end')
      .should.be.true;
    container.querySelector('[data-bs-popper="static"]')!.should.exist;
  });

  it('allows custom responsive alignment classes', () => {
    const { container } = render(
      <DropdownMenu show align={{ custom: 'end' }}>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu-custom-end')
      .should.be.true;
  });

  it('should render variant', () => {
    const { container } = render(
      <DropdownMenu show variant="dark">
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    );

    container.firstElementChild!.classList.contains('dropdown-menu-dark').should
      .be.true;
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
      getDropdownMenuPlacement(false, 'down', false).should.equal(
        'bottom-start',
      );
      getDropdownMenuPlacement(true, 'down', false).should.equal('bottom-end');
    });

    it('should return bottom placement for RTL', () => {
      getDropdownMenuPlacement(false, 'down', true).should.equal('bottom-end');
      getDropdownMenuPlacement(true, 'down', true).should.equal('bottom-start');
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
});
