import { mount } from 'enzyme';
import DropdownToggle from '../src/DropdownToggle';

describe('<DropdownToggle>', () => {
  const simpleToggle = (
    <DropdownToggle id="test-id">herpa derpa</DropdownToggle>
  );

  it('renders toggle button', () => {
    mount(simpleToggle)
      .assertSingle(
        'button[aria-expanded=false].dropdown-toggle.btn.btn-primary',
      )
      .text()
      .should.equal('herpa derpa');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
    mount(simpleToggle).assertSingle('button[aria-haspopup=true]');
  });

  it('renders children', () => {
    mount(
      <DropdownToggle id="test-id">
        <h3>herpa derpa</h3>
      </DropdownToggle>,
    )
      .assertSingle('h3')
      .text()
      .should.equal('herpa derpa');
  });

  it('forwards onClick handler', (done) => {
    const handleClick = (event) => {
      event.should.be.ok;
      done();
    };
    mount(
      <DropdownToggle
        open={false}
        id="test-id"
        title="click forwards"
        onClick={handleClick}
      />,
    ).simulate('click');
  });

  it('forwards id', () => {
    const id = 'testid';
    mount(<DropdownToggle id={id} />).assertSingle(`button#${id}`);
  });

  it('does not forward bsPrefix', () => {
    mount(
      <DropdownToggle
        bsPrefix="my-custom-bsPrefix"
        open={false}
        title="bsClass"
        id="test-id"
      />,
    ).assertSingle('.my-custom-bsPrefix.btn');
  });
});
