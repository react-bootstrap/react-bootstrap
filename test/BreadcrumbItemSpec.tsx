import sinon from 'sinon';
import { render, fireEvent } from '@testing-library/react';
import { expect } from 'chai';

import Breadcrumb from '../src/Breadcrumb';
import Button from '../src/Button';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    const { container } = render(
      <Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>,
    );

    container.querySelectorAll('button.active').length.should.equal(0);
  });

  it('Should render `li` with no children as inner element when active.', () => {
    const { queryAllByRole, getByText } = render(
      <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>,
    );

    queryAllByRole('listitem').length.should.equal(1);
    getByText('Active Crumb').should.exist;
  });

  it('Should render `li` with no children as inner element when active and has href', () => {
    const { queryAllByRole, getByText } = render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>,
    );

    queryAllByRole('listitem').length.should.equal(1);
    getByText('Active Crumb').should.exist;
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const { getByTestId } = render(
      <Breadcrumb.Item className="custom-one custom-two" data-testid="test">
        a
      </Breadcrumb.Item>,
    );

    const item = getByTestId('test');
    item.classList.contains('custom-one').should.be.true;
    item.classList.contains('custom-two').should.be.true;
  });

  it('Should add aria-current to active element', () => {
    const { queryAllByRole } = render(
      <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>,
    );

    queryAllByRole('listitem', { current: 'page' }).length.should.equal(1);
  });

  it('Should spread additional props onto inner element', () => {
    const handleClick = sinon.spy();

    const { getByRole } = render(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>,
    );

    fireEvent.click(getByRole('button'));

    handleClick.should.have.been.calledOnce;
  });

  it('Should apply id onto the li element', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>,
    );

    container.querySelectorAll('#test-link-id').length.should.equal(1);
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>,
    );

    const href = getByRole('link').getAttribute('href') || '';
    href.should.equal('http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const { getByTitle } = render(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );

    getByTitle('test-title').should.exist;
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const { container } = render(
      <Breadcrumb.Item title="test-title" href="/hi" data-testid>
        Crumb
      </Breadcrumb.Item>,
    );

    container.querySelectorAll('li[href="/hi"]').length.should.equal(0);
    container.querySelectorAll('li[title="test-title"]').length.should.equal(0);
  });

  it('Should set `target` attribute on `anchor`', () => {
    const { getByRole } = render(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );
    expect(getByRole('link').getAttribute('target')).to.be.equal('_blank');
  });

  it('Should have li as default component', () => {
    const { getByTestId } = render(<Breadcrumb.Item data-testid="test" />);

    getByTestId('test').tagName.toLowerCase().should.equal('li');
  });

  it('Should be able to customize inner link element', () => {
    const { container } = render(<Breadcrumb.Item linkAs={Button} />);

    container.querySelectorAll('a').length.should.equal(0);
    container.querySelectorAll('button').length.should.equal(1);
  });

  it('Should be able to pass props to the customized inner link element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item linkAs={Button} linkProps={{ type: 'submit' }} />,
    );

    expect(getByRole('button').getAttribute('type')).to.be.equal('submit');
  });

  it('Should be able to pass attributes to the link element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item linkProps={{ foo: 'bar' }}>Crumb</Breadcrumb.Item>,
    );

    expect(getByRole('button').getAttribute('foo')).to.be.equal('bar');
  });

  it('Should be able to pass attributes to the li element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item data-foo="bar">Crumb</Breadcrumb.Item>,
    );

    expect(getByRole('listitem').getAttribute('data-foo')).to.be.equal('bar');
  });
});
