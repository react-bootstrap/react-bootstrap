import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import SplitButton from '../src/SplitButton';
import DropdownItem from '../src/DropdownItem';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton data-testid="test-wrapper" title="Title" id="test-id">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', () => {
    const { getByTestId } = render(simple);
    const splitButtonElem = getByTestId('test-wrapper');

    splitButtonElem.classList.contains('show').should.be.false;
    fireEvent.click(splitButtonElem.children[1]);

    splitButtonElem.classList.contains('show').should.be.true;
  });

  it('should not open the menu when other button is clicked', () => {
    const { getByTestId } = render(simple);
    const splitButtonElem = getByTestId('test-wrapper');

    splitButtonElem.classList.contains('show').should.be.false;
    fireEvent.click(splitButtonElem.children[0]);
    splitButtonElem.classList.contains('show').should.be.false;
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', (done) => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={() => done()}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');

    fireEvent.click(splitButtonElem.firstElementChild!);
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', () => {
    const onClickSpy = sinon.spy();

    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={onClickSpy}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    fireEvent.click(splitButtonElem.children[1]);

    onClickSpy.should.not.have.been.called;
  });

  it('Should pass disabled to both buttons', () => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        disabled
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');

    splitButtonElem.getAttribute('disabled')!.should.exist;
    splitButtonElem.children[0].getAttribute('disabled')!.should.exist;
    splitButtonElem.children[1].getAttribute('disabled')!.should.exist;
  });

  it('Should set target attribute on anchor', () => {
    const { getByTestId } = render(
      <SplitButton
        title="Title"
        id="test-id"
        data-testid="test-wrapper"
        href="/some/unique-thing/"
        target="_blank"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    splitButtonElem.firstElementChild!.tagName.toLowerCase().should.equal('a');
    splitButtonElem
      .firstElementChild!.getAttribute('href')!
      .should.equal('/some/unique-thing/');
    splitButtonElem
      .firstElementChild!.getAttribute('target')!
      .should.equal('_blank');
  });

  it('should set accessible label on toggle', () => {
    const { getByText } = render(simple);
    const toggleLabelElem = getByText('Toggle dropdown');
    toggleLabelElem.classList.contains('visually-hidden').should.be.true;
  });

  it('should set aria-label on toggle from toggleLabel', () => {
    const { getByText } = render(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const labelElem = getByText('Label');
    labelElem.classList.contains('visually-hidden').should.be.true;
  });

  it('should set type attribute from type', () => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        type="submit"
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    splitButtonElem
      .firstElementChild!.getAttribute('type')!
      .should.equal('submit');
  });
});
