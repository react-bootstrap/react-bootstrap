import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import DropdownToggle from '../src/DropdownToggle';

describe('<DropdownToggle>', () => {
  it('renders toggle button', () => {
    const { getByText } = render(
      <DropdownToggle id="test-id">herpa derpa</DropdownToggle>,
    );

    const toggle = getByText('herpa derpa');
    toggle.getAttribute('aria-expanded')!.should.equal('false');
    toggle.classList.should.contain(['dropdown-toggle', 'btn', 'btn-primary']);
  });

  it('renders children', () => {
    const { getByText } = render(
      <DropdownToggle id="test-id">
        <h3>herpa derpa</h3>
      </DropdownToggle>,
    );

    getByText('herpa derpa').should.exist;
  });

  it('forwards onClick handler', () => {
    const onClickSpy = sinon.spy();

    const { container } = render(
      <DropdownToggle
        id="test-id"
        title="click forwards"
        onClick={onClickSpy}
      />,
    );

    fireEvent.click(container.firstElementChild!);
    onClickSpy.should.be.called;
  });

  it('forwards id', () => {
    const { container } = render(<DropdownToggle id="testid" />);
    container.firstElementChild!.id.should.equal('testid');
  });

  it('does not forward bsPrefix', () => {
    const { container } = render(
      <DropdownToggle
        bsPrefix="my-custom-bsPrefix"
        title="bsClass"
        id="test-id"
      />,
    );
    container.firstElementChild!.classList.should.contain([
      'my-custom-bsPrefix',
      'btn',
    ]);
  });
});
