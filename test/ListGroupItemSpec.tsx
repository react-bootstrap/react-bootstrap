import { fireEvent, render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shouldWarn } from './helpers';

import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a div', () => {
    const { getByTestId } = render(<ListGroupItem data-testid="test" />);

    const item = getByTestId('test');
    item.tagName.toLowerCase().should.equal('div');
    item.classList.contains('list-group-item').should.be.true;

    // .assertSingle('div.list-group-item');
  });

  it('accepts variants', () => {
    const { getByTestId } = render(
      <ListGroupItem variant="success" data-testid="test" />,
    );

    const item = getByTestId('test');
    item.classList.contains('list-group-item').should.be.true;
    item.classList.contains('list-group-item-success').should.be.true;
  });

  it('accepts active', () => {
    const { getByTestId } = render(<ListGroupItem active data-testid="test" />);

    const item = getByTestId('test');
    item.classList.contains('list-group-item').should.be.true;
    item.classList.contains('active').should.be.true;
  });

  it('accepts disabled', () => {
    const { getByTestId } = render(
      <ListGroupItem disabled data-testid="test" />,
    );

    const item = getByTestId('test');
    item.classList.contains('list-group-item').should.be.true;
    item.classList.contains('disabled').should.be.true;
  });

  it('accepts as prop', () => {
    const { getByTestId } = render(
      <ListGroupItem as="span" data-testid="test" />,
    );

    const item = getByTestId('test');
    item.tagName.toLowerCase().should.equal('span');
    item.classList.contains('list-group-item').should.be.true;
  });

  it('should not be focusable when disabled', () => {
    const { getByTestId } = render(
      <ListGroupItem disabled data-testid="test" />,
    );

    expect(getByTestId('test').getAttribute('tabindex')).to.equal('-1');
  });

  it('should respect user-specified tabIndex', () => {
    const { getByTestId } = render(
      <ListGroupItem disabled tabIndex={4} data-testid="test" />,
    );

    expect(getByTestId('test').getAttribute('tabindex')).to.equal('4');
  });

  describe('actions', () => {
    it('renders a button', () => {
      const { getByTestId } = render(
        <ListGroupItem action data-testid="test" />,
      );

      const item = getByTestId('test');
      item.tagName.toLowerCase().should.equal('button');
      item.classList.contains('list-group-item-action').should.be.true;
    });
    it('renders an anchor', () => {
      const { getByTestId } = render(
        <ListGroupItem action href="/foo" data-testid="test" />,
      );

      const item = getByTestId('test');
      item.tagName.toLowerCase().should.equal('a');
      item.classList.contains('list-group-item-action').should.be.true;
      expect(item.getAttribute('href')).to.be.equal('/foo');
    });
    it('renders a div and show warning', () => {
      shouldWarn('together');
      const { getByTestId } = render(
        <ListGroupItem action={false} href="/foo" data-testid="test" />,
      );

      const item = getByTestId('test');
      item.tagName.toLowerCase().should.equal('div');
      item.classList.contains('list-group-item-action').should.be.false;
      expect(item.getAttribute('href')).to.be.equal('/foo');
    });
    it('passes href to custom as components', () => {
      const { getByTestId } = render(
        <ListGroupItem
          as="div"
          action={false}
          data-testid="test"
          href="/foo"
        />,
      );
      const item = getByTestId('test');
      item.tagName.toLowerCase().should.equal('div');
      item.classList.contains('list-group-item-action').should.be.false;
      expect(item.getAttribute('href')).to.be.equal('/foo');
    });
  });

  describe('onClick', () => {
    it('Should call on click', () => {
      const onClickSpy = sinon.spy();

      const { getByTestId } = render(
        <ListGroupItem onClick={onClickSpy} data-testid="test" />,
      );

      fireEvent.click(getByTestId('test'));
      onClickSpy.should.have.been.calledOnce;
    });

    it('Should not call if disabled', () => {
      const onClickSpy = sinon.spy();

      const { getByTestId } = render(
        <ListGroupItem onClick={onClickSpy} disabled data-testid="test" />,
      );

      fireEvent.click(getByTestId('test'));
      onClickSpy.should.not.have.been.called;
    });
  });
});
