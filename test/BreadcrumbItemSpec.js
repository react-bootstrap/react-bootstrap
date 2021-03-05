import sinon from 'sinon';
import { mount } from 'enzyme';

import Breadcrumb from '../src/Breadcrumb';
import Button from '../src/Button';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    mount(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>)
      .find('a.active')
      .should.have.length(0);
  });

  it('Should render `li` with no children as inner element when active.', () => {
    let li = mount(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>).find(
      'li',
    );
    li.should.have.length(1);
    li.children().html().should.eql('Active Crumb');
  });

  it('Should render `li` with no children as inner element when active and has href', () => {
    let li = mount(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>,
    ).find('li');
    li.should.have.length(1);
    li.children().html().should.eql('Active Crumb');
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    mount(
      <Breadcrumb.Item className="custom-one custom-two">a</Breadcrumb.Item>,
    )
      .find('li.custom-one.custom-two')
      .should.have.length(1);
  });

  it('Should add aria-current to active element', () => {
    mount(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>)
      .find('li.active[aria-current="page"]')
      .should.have.length(1);
  });

  it('Should spread additional props onto inner element', () => {
    const handleClick = sinon.spy();

    const instance = mount(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>,
    );

    instance.find('a').simulate('click');

    expect(handleClick.callCount).to.equal(1);
  });

  it('Should apply id onto the li element', () => {
    mount(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>,
    )
      .find('li#test-link-id')
      .should.have.length(1);
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = mount(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>,
    );

    instance
      .find('a')
      .prop('href')
      .should.eq('http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = mount(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );

    instance.find('a').prop('title').should.eq('test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = mount(
      <Breadcrumb.Item title="test-title" href="/hi">
        Crumb
      </Breadcrumb.Item>,
    );
    expect(instance.find('li[href="/hi"]').exists()).to.equal(false);
    expect(instance.find('li[title="test-title"]').exists()).to.equal(false);
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = mount(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );
    instance.find('a').prop('target').should.eq('_blank');
  });

  it('Should have li as default component', () => {
    mount(<Breadcrumb.Item />).assertSingle('li');
  });

  it('Should be able to customize inner link element', () => {
    const instance = mount(<Breadcrumb.Item linkAs={Button} />);
    instance.find('a').should.have.length(0);
    instance.find('button').should.have.length(1);
  });

  it('Should be able to pass props to the customized inner link element', () => {
    const instance = mount(
      <Breadcrumb.Item linkAs={Button} linkProps={{ type: 'submit' }} />,
    );
    instance.find('button').prop('type').should.eq('submit');
  });

  it('Should be able to pass attributes to the link element', () => {
    const instance = mount(
      <Breadcrumb.Item linkProps={{ foo: 'bar' }}>Crumb</Breadcrumb.Item>,
    );
    instance.find('a').prop('foo').should.eq('bar');
  });

  it('Should be able to pass attributes to the li element', () => {
    const instance = mount(<Breadcrumb.Item foo="bar">Crumb</Breadcrumb.Item>);
    instance.find('li').prop('foo').should.eq('bar');
  });
});
