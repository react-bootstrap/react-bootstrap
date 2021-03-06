import * as React from 'react';
import { mount } from 'enzyme';

import Button from '../src/Button';

describe('<Button>', () => {
  it('Should output a button', () => {
    mount(<Button>Title</Button>)
      .find('button')
      .should.have.length(1);
  });

  it('Should have type=button by default', () => {
    mount(<Button>Title</Button>)
      .find('button')
      .getDOMNode()
      .getAttribute('type')
      .should.equal('button');
  });

  it('Should show the type if passed one', () => {
    mount(<Button type="submit">Title</Button>)
      .find('button')
      .getDOMNode()
      .getAttribute('type')
      .should.equal('submit');
  });

  it('Should show the type if explicitly passed in when "as" is used', () => {
    mount(
      <Button as="div" type="submit">
        Title
      </Button>,
    )
      .getDOMNode()
      .getAttribute('type')
      .should.equal('submit');
  });

  it('Should not have default type=button when "as" is used', () => {
    const wrapper = mount(<Button as="div">Title</Button>);

    expect(wrapper.getDOMNode().getAttribute('type')).to.be.null;
  });

  it('should forward refs to the button', () => {
    const ref = React.createRef();
    mount(
      <div>
        <Button ref={ref}>Yo</Button>
      </div>,
    );

    ref.current.tagName.should.equal('BUTTON');

    mount(
      <div>
        <Button ref={ref} href="a">
          Yo
        </Button>
      </div>,
    );

    ref.current.tagName.should.equal('A');
  });

  it('Should output an anchor if called with a href', () => {
    let href = '/url';

    mount(<Button href={href}>Title</Button>).assertSingle(`a[href="${href}"]`);
  });

  it('Should call onClick callback', (done) => {
    mount(<Button onClick={() => done()}>Title</Button>).simulate('click');
  });

  it('Should be disabled', () => {
    mount(<Button disabled>Title</Button>).assertSingle(`button[disabled]`);
  });

  it('Should be disabled link', () => {
    mount(
      <Button disabled href="#">
        Title
      </Button>,
    ).assertSingle(`a.disabled`);
  });

  it('Should apply variant class', () => {
    mount(<Button variant="danger">Title</Button>).assertSingle(`.btn-danger`);
  });

  it('Should have size class', () => {
    mount(<Button size="lg">Title</Button>).assertSingle(`.btn-lg`);
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    mount(
      <Button className="bob" variant="danger">
        Title
      </Button>,
    ).assertSingle(`.bob.btn-danger`);
  });

  it('Should default to variant="primary"', () => {
    mount(<Button>Title</Button>).assertSingle(`.btn-primary`);
  });

  it('Should remove default variant', () => {
    mount(<Button variant={null}>Title</Button>)
      .find(`.btn-primary`)
      .should.have.length(0);
  });

  it('Should not output null variant', () => {
    mount(<Button variant="">Title</Button>)
      .find(`.btn-null`)
      .should.have.length(0);
  });

  it('Should not output empty variant', () => {
    mount(<Button variant="">Title</Button>)
      .find(`.btn-`)
      .should.have.length(0);
  });

  it('Should be active', () => {
    mount(<Button active>Title</Button>).assertSingle(`.active`);
  });

  it('Should allow a custom prefix', () => {
    mount(
      <Button bsPrefix="my-btn" variant="danger">
        Title
      </Button>,
    ).assertSingle(`.my-btn.my-btn-danger`);
  });
});
