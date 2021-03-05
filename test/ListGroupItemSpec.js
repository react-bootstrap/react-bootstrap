import { mount } from 'enzyme';

import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a div', () => {
    mount(<ListGroupItem />).assertSingle('div.list-group-item');
  });

  it('accepts variants', () => {
    mount(<ListGroupItem variant="success" />).assertSingle(
      'div.list-group-item.list-group-item-success',
    );
  });

  it('accepts active', () => {
    mount(<ListGroupItem active />).assertSingle('div.list-group-item.active');
  });

  it('accepts disabled', () => {
    mount(<ListGroupItem disabled />).assertSingle(
      'div.list-group-item.disabled',
    );
  });

  it('accepts as prop', () => {
    mount(<ListGroupItem as="span" />).assertSingle('span.list-group-item');
  });

  it('should not be focusable when disabled', () => {
    const wrapper = mount(<ListGroupItem disabled />);
    const node = wrapper.find('.list-group-item').first().getDOMNode();
    expect(node.getAttribute('tabindex')).to.equal('-1');
  });

  it('should respect user-specified tabIndex', () => {
    const wrapper = mount(<ListGroupItem disabled tabIndex={4} />);
    const node = wrapper.find('.list-group-item').first().getDOMNode();
    expect(node.getAttribute('tabindex')).to.equal('4');
  });

  describe('actions', () => {
    it('renders a button', () => {
      mount(<ListGroupItem action />).assertSingle(
        'button.list-group-item.list-group-item-action',
      );
    });
    it('renders an anchor', () => {
      mount(<ListGroupItem action href="/foo" />).assertSingle(
        'a.list-group-item.list-group-item-action[href="/foo"]',
      );
    });
  });

  describe('onClick', () => {
    it('Should call on click', () => {
      const listGroupItemOnClick = sinon.spy();
      const wrapper = mount(<ListGroupItem onClick={listGroupItemOnClick} />);
      wrapper.find('div.list-group-item').simulate('click');
      expect(listGroupItemOnClick).to.be.calledOnce;
    });

    it('Should not call if disabled', () => {
      const listGroupItemOnClick = sinon.spy();
      const wrapper = mount(
        <ListGroupItem onClick={listGroupItemOnClick} disabled />,
      );
      wrapper.find('div.list-group-item').simulate('click');
      expect(listGroupItemOnClick).not.to.have.been.called;
    });
  });
});
