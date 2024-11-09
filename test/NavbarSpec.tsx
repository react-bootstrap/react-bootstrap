import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    render(<Navbar data-testid="test" />);
    const navbarElem = screen.getByTestId('test');

    expect(navbarElem.classList).toContain('navbar');
    expect(navbarElem.classList).toContain('navbar-expand');
    expect(navbarElem.classList).toContain('navbar-light');
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    render(<Navbar as="div" data-testid="test" />);
    const navbarElem = screen.getByTestId('test');

    expect(navbarElem.tagName).toEqual('DIV');
    expect(navbarElem.getAttribute('role')).toEqual('navigation');
  });

  it('Should add fixed=top|bottom variation', () => {
    render(<Navbar fixed="top" data-testid="test1" />);
    const firstNavbarElem = screen.getByTestId('test1');
    expect(firstNavbarElem.classList).toContain('fixed-top');

    render(<Navbar fixed="bottom" data-testid="test2" />);

    const navbarElem = screen.getByTestId('test2');
    expect(navbarElem.classList).toContain('fixed-bottom');
  });

  it('Should variant=dark', () => {
    render(<Navbar variant="dark" data-testid="test" />);
    expect(screen.getByTestId('test').classList).toContain('navbar-dark');
  });

  it('Should override role attribute', () => {
    render(<Navbar role="banner" data-testid="test" />);
    expect(screen.getByTestId('test').getAttribute('role')).toEqual('banner');
  });

  it('Should pass navbar context to navs', () => {
    render(
      <Navbar>
        <Nav data-testid="test" />
      </Navbar>,
    );
    const navElem = screen.getByTestId('test');
    expect(navElem.classList).toContain('navbar-nav');
  });

  it('Should add custom toggle', () => {
    render(
      <Navbar>
        <Navbar.Toggle as="p" data-testid="test">
          hi
        </Navbar.Toggle>
      </Navbar>,
    );
    const navToggleElem = screen.getByTestId('test');
    expect(navToggleElem.textContent).toEqual('hi');
    expect(navToggleElem.classList).toContain('navbar-toggler');
    expect(navToggleElem.tagName).toEqual('P');
  });

  it('Should trigger onToggle', () => {
    const onToggleSpy = vi.fn();
    render(
      <Navbar onToggle={onToggleSpy}>
        <Navbar.Toggle data-testid="test" />
      </Navbar>,
    );
    const toggleElem = screen.getByTestId('test');
    fireEvent.click(toggleElem);

    expect(onToggleSpy).toHaveBeenCalledOnce();
    expect(onToggleSpy).toHaveBeenCalledWith(true);
  });

  it('Should not swallow onClick', () => {
    const onClickSpy = vi.fn();

    render(
      <Navbar>
        <Navbar.Toggle onClick={onClickSpy} data-testid="test" />
      </Navbar>,
    );
    const toggleElem = screen.getByTestId('test');
    fireEvent.click(toggleElem);

    expect(onClickSpy).toHaveBeenCalledOnce();
  });

  it('Should render collapse', () => {
    render(
      <Navbar>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>,
    );
    expect(screen.getByTestId('test').classList).toContain('navbar-collapse');
  });

  it('Should pass expanded to Collapse', () => {
    render(
      <Navbar expanded>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>,
    );
    const toggleElem = screen.getByTestId('test');
    expect(toggleElem.classList).toContain('show');
  });

  it('Should wire the toggle to the collapse', async () => {
    render(
      <Navbar>
        <Navbar.Toggle data-testid="toggler" />
        <Navbar.Collapse data-testid="collapse">hello</Navbar.Collapse>
      </Navbar>,
    );

    const toggleElem = screen.getByTestId('toggler');
    const collapseElem = screen.getByTestId('collapse');

    expect(collapseElem.classList).not.toContain('show');
    expect(toggleElem.classList).toContain('collapsed');

    fireEvent.click(toggleElem);

    await waitFor(() => expect(collapseElem.classList).toContain('show'));

    expect(toggleElem.classList).not.toContain('collapsed');
  });

  it('Should open external href link in collapseOnSelect', () => {
    const onClickSpy = vi.fn((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
    });
    render(
      <Navbar>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link
              href="https://www.google.com"
              data-testid="test"
              onClick={onClickSpy}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const linkItem = screen.getByTestId('test');
    fireEvent.click(linkItem);
    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(screen.getByTestId('test').getAttribute('href')).toEqual(
      'https://www.google.com',
    );
  });

  it('Should fire external href click', async () => {
    const onClickSpy = vi.fn((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
    });
    render(
      <Navbar expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="https://www.google.com" onClick={onClickSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkItem = screen.getByTestId('test');
    fireEvent.click(innerLinkItem);

    await waitFor(() => expect(onClickSpy).toHaveBeenCalledOnce());
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const onToggleSpy = vi.fn();
    const onClickSpy = vi.fn();
    render(
      <Navbar collapseOnSelect onToggle={onToggleSpy} expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#" onClick={onClickSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkElem = screen.getByTestId('test');
    fireEvent.click(innerLinkElem);

    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(onToggleSpy).toHaveBeenCalledOnce();
    expect(onToggleSpy).toHaveBeenCalledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', () => {
    const onSelectSpy = vi.fn();
    const onClickSpy = vi.fn();

    render(
      <Navbar onSelect={onSelectSpy}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#home" onClick={onClickSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkElem = screen.getByTestId('test');
    fireEvent.click(innerLinkElem);

    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(onSelectSpy).toHaveBeenCalledOnce();
    expect(onSelectSpy).toHaveBeenCalledWith('#home', expect.anything());
  });

  it('Should have nav as default component', () => {
    render(<Navbar data-testid="test" />);
    expect(screen.getByTestId('test').tagName).toEqual('NAV');
  });

  it('Should render correctly when expand is a string', () => {
    render(<Navbar expand="sm" data-testid="test" />);
    expect(screen.getByTestId('test').classList).toContain('navbar-expand-sm');
  });

  it('should allow custom breakpoints for expand', () => {
    render(<Navbar expand="custom" data-testid="test" />);
    expect(screen.getByTestId('test').classList).toContain(
      'navbar-expand-custom',
    );
  });

  it('Should render correctly when bg is set', () => {
    render(<Navbar bg="light" data-testid="test" />);
    expect(screen.getByTestId('test').classList).toContain('bg-light');
  });

  it('Should render correctly when sticky is set', () => {
    render(<Navbar sticky="top" data-testid="test" />);
    expect(screen.getByTestId('test').classList).toContain('sticky-top');
  });
});
