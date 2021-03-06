import { mount } from 'enzyme';

import SplitButton from '../src/SplitButton';
import DropdownItem from '../src/DropdownItem';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton title="Title" id="test-id">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', () => {
    const wrapper = mount(simple);

    wrapper.assertNone('.show');

    wrapper.find('button.dropdown-toggle').simulate('click');

    wrapper.assertSingle('div.dropdown.show');
  });

  it('should not open the menu when other button is clicked', () => {
    const wrapper = mount(simple);

    wrapper.assertNone('.show');

    wrapper.find('button').first().simulate('click');

    wrapper.assertNone('.show');
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', (done) => {
    const wrapper = mount(
      <SplitButton title="Title" id="test-id" onClick={() => done()}>
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );

    wrapper.find('button').first().simulate('click');
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', () => {
    let onClickSpy = sinon.spy();

    const wrapper = mount(
      <SplitButton title="Title" id="test-id" onClick={onClickSpy}>
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );

    wrapper.find('button.dropdown-toggle').simulate('click');

    expect(onClickSpy.callCount).to.equal(0);
  });

  it('Should pass disabled to both buttons', () => {
    mount(
      <SplitButton title="Title" id="test-id" disabled>
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    )
      .find('button[disabled]')
      .length.should.equal(2);
  });

  it('Should set target attribute on anchor', () => {
    mount(
      <SplitButton
        title="Title"
        id="test-id"
        href="/some/unique-thing/"
        target="_blank"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </SplitButton>,
    ).assertSingle('a[target="_blank"]');
  });

  it('should set accessible label on toggle', () => {
    mount(simple)
      .assertSingle('.visually-hidden')
      .text()
      .should.equal('Toggle dropdown');
  });

  it('should set aria-label on toggle from toggleLabel', () => {
    mount(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    )
      .assertSingle('.visually-hidden')
      .text()
      .should.equal('Label');
  });

  it('should set type attribute from type', () => {
    mount(
      <SplitButton title="Title" id="test-id" type="submit">
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    ).assertSingle('button[type="submit"]');
  });
});
