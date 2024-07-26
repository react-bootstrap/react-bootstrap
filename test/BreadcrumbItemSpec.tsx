import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Breadcrumb from '../src/Breadcrumb';
import Button from '../src/Button';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    const { container } = render(
      <Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('button.active').length).toEqual(0);
  });

  it('Should render `li` with no children as inner element when active.', () => {
    render(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    expect(screen.queryAllByRole('listitem').length).toEqual(1);
    expect(screen.getByText('Active Crumb')).toBeTruthy();
  });

  it('Should render `li` with no children as inner element when active and has href', () => {
    render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>,
    );

    expect(screen.queryAllByRole('listitem').length).toEqual(1);
    expect(screen.getByText('Active Crumb')).toBeTruthy();
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    render(
      <Breadcrumb.Item className="custom-one custom-two" data-testid="test">
        a
      </Breadcrumb.Item>,
    );

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('custom-one');
    expect(item.classList).toContain('custom-two');
  });

  it('Should add aria-current to active element', () => {
    render(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    expect(
      screen.queryAllByRole('listitem', { current: 'page' }).length,
    ).toEqual(1);
  });

  it('Should spread additional props onto inner element', () => {
    const handleClick = vi.fn();

    render(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should apply id onto the li element', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('#test-link-id').length).toEqual(1);
  });

  it('Should apply `href` property onto `a` inner element', () => {
    render(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>,
    );

    const href = screen.getByRole('link').getAttribute('href') || '';
    expect(href).toEqual('http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    render(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );

    expect(screen.getByTitle('test-title')).toBeTruthy();
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const { container } = render(
      <Breadcrumb.Item title="test-title" href="/hi" data-testid>
        Crumb
      </Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('li[href="/hi"]').length).toEqual(0);
    expect(container.querySelectorAll('li[title="test-title"]').length).toEqual(
      0,
    );
  });

  it('Should set `target` attribute on `anchor`', () => {
    render(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );
    expect(screen.getByRole('link').getAttribute('target')).to.be.equal(
      '_blank',
    );
  });

  it('Should have li as default component', () => {
    render(<Breadcrumb.Item data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('LI');
  });

  it('Should be able to customize inner link element', () => {
    const { container } = render(<Breadcrumb.Item linkAs={Button} />);

    expect(container.querySelectorAll('a').length).toEqual(0);
    expect(container.querySelectorAll('button').length).toEqual(1);
  });

  it('Should be able to pass props to the customized inner link element', () => {
    render(<Breadcrumb.Item linkAs={Button} linkProps={{ type: 'submit' }} />);

    expect(screen.getByRole('button').getAttribute('type')).to.be.equal(
      'submit',
    );
  });

  it('Should be able to pass attributes to the link element', () => {
    render(<Breadcrumb.Item linkProps={{ foo: 'bar' }}>Crumb</Breadcrumb.Item>);

    expect(screen.getByRole('button').getAttribute('foo')).to.be.equal('bar');
  });

  it('Should be able to pass attributes to the li element', () => {
    render(<Breadcrumb.Item data-foo="bar">Crumb</Breadcrumb.Item>);

    expect(screen.getByRole('listitem').getAttribute('data-foo')).to.be.equal(
      'bar',
    );
  });
});
