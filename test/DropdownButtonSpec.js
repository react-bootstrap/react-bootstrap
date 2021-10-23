import { mount } from 'enzyme';
import DropdownButton from '../src/DropdownButton';
import DropdownItem from '../src/DropdownItem';

describe('<DropdownButton>', () => {
  const simpleDropdown = (
    <DropdownButton title="Simple Dropdown" id="test-id">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
    </DropdownButton>
  );

  it('renders a toggle with the title prop', () => {
    mount(simpleDropdown)
      .find('button.dropdown-toggle.btn#test-id')
      .text()
      .should.equal('Simple Dropdown');
  });

  it('renders single DropdownItem child', () => {
    mount(
      <DropdownButton defaultShow title="Single child" id="test-id">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    ).assertSingle('.dropdown-menu a.dropdown-item');
  });

  it('forwards align="end" to the Dropdown', () => {
    mount(
      <DropdownButton align="end" title="blah" id="test-id">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    )
      .find('Dropdown')
      .first()
      .props()
      .align.should.equal('end');
  });

  it('passes variant and size to the toggle', () => {
    mount(
      <DropdownButton title="blah" size="sm" variant="success" id="test-id">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    ).find('button.dropdown-toggle.btn-success.btn-sm');
  });

  it('passes menuVariant to dropdown menu', () => {
    const wrapper = mount(
      <DropdownButton title="blah" menuVariant="dark" id="test">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    expect(wrapper.find('DropdownMenu').props()).to.have.property(
      'variant',
      'dark',
    );
  });

  it('forwards onSelect handler to DropdownItems', (done) => {
    const selectedEvents = [];

    const onSelect = (eventKey) => {
      selectedEvents.push(eventKey);

      if (selectedEvents.length === 4) {
        selectedEvents.should.eql(['1', '2', '3', '4']);
        done();
      }
    };
    const instance = mount(
      <DropdownButton
        defaultShow
        title="Simple Dropdown"
        onSelect={onSelect}
        id="test-id"
      >
        <DropdownItem eventKey="1">Item 1</DropdownItem>
        <DropdownItem eventKey="2">Item 2</DropdownItem>
        <DropdownItem eventKey="3">Item 3</DropdownItem>
        <DropdownItem eventKey="4">Item 4</DropdownItem>
      </DropdownButton>,
    );

    instance.find('a').forEach((item) => {
      item.simulate('click');
    });
  });

  it('does not close when onToggle is controlled', () => {
    const handleSelect = sinon.spy();

    const wrapper = mount(
      <DropdownButton
        show
        title="Simple Dropdown"
        onToggle={handleSelect}
        id="test-id"
      >
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </DropdownButton>,
    );

    wrapper.find('button').simulate('click');
    wrapper.find('.dropdown-menu a').first().simulate('click');

    handleSelect.should.have.been.calledWith(false);
    wrapper.find('Dropdown').first().prop('show').should.equal(true);
  });

  it('Should pass disabled to button', () => {
    mount(
      <DropdownButton disabled title="Title" id="testId">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </DropdownButton>,
    ).assertSingle('button[disabled]');
  });

  it('should pass bsPrefix to the button', () => {
    mount(
      <DropdownButton title="title" id="test-id" bsPrefix="my-button">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownButton>,
    ).assertSingle('button.my-button-primary');
  });

  it('should pass defaultShow to `<Dropdown>`', () => {
    const wrapper = mount(
      <DropdownButton id="test-id" title="title" defaultShow>
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownButton>,
    );

    expect(wrapper.children().props().defaultShow).to.equal(true);
    expect(wrapper.find('DropdownToggle').first().props().defaultShow).to.not
      .exist;
  });
});
