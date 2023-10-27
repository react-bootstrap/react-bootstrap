import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from '../src/Dropdown';

describe('<Dropdown.Menu rootCloseEvent="mousedown">', () => {
  it('does not flicker when rootCloseEvent is set to "mousedown" and toggle button is clicked', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" data-testid="dropdown-toggle">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu rootCloseEvent="mousedown">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );
    // Click the toggle button to open the menu
    fireEvent.click(screen.getByTestId('dropdown-toggle'));
    // The menu should now be in the DOM
    container.firstElementChild!.classList.contains('show').should.be.true;
    // Click the toggle button again to close the menu
    fireEvent.click(screen.getByTestId('dropdown-toggle'));
    // The menu should no longer be in the DOM
    container.firstElementChild!.classList.contains('show').should.be.false;
  });
});
