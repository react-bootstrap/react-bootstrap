import { mount } from 'enzyme';

import ProgressBar from '../src/ProgressBar';
import { shouldWarn } from './helpers';

describe('<ProgressBar>', () => {
  it('Should output a progress bar with wrapper', () => {
    mount(<ProgressBar min={0} max={10} now={0} />).assertSingle(
      'div.progress .progress-bar[role="progressbar"]',
    );
  });

  ['success', 'warning', 'info', 'danger'].forEach((variant) => {
    it(`Should have the variant="${variant}" class`, () => {
      mount(
        <ProgressBar min={0} max={10} now={0} variant={variant} />,
      ).assertSingle(`.progress-bar.bg-${variant}`);
    });
  });

  it('Should default to min:0, max:100', () => {
    mount(<ProgressBar now={5} />).assertSingle(
      '.progress-bar[aria-valuemin=0][aria-valuemax=100]',
    );
  });

  it('Should have 0% computed width', () => {
    const node = mount(<ProgressBar min={0} max={10} now={0} />)
      .find('.progress-bar')
      .getDOMNode();

    assert.equal(node.style.width, '0%');
  });

  it('Should have 10% computed width', () => {
    const node = mount(<ProgressBar min={0} max={10} now={1} />)
      .find('.progress-bar')
      .getDOMNode();

    assert.equal(node.style.width, '10%');
  });

  it('Should have 100% computed width', () => {
    const node = mount(<ProgressBar min={0} max={10} now={10} />)
      .find('.progress-bar')
      .getDOMNode();

    assert.equal(node.style.width, '100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    const node = mount(<ProgressBar min={1} max={11} now={6} />)
      .find('.progress-bar')
      .getDOMNode();

    assert.equal(node.style.width, '50%');
  });

  it('Should not have label', () => {
    const node = mount(<ProgressBar min={0} max={10} now={5} />).getDOMNode();

    assert.equal(node.textContent, '');
  });

  it('Should have label', () => {
    const node = mount(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        variant="success"
        label="progress bar label"
      />,
    ).getDOMNode();

    assert.equal(node.textContent, 'progress bar label');
  });

  it('Should have screen reader only label', () => {
    const node = mount(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        visuallyHidden
        variant="success"
        label="progress bar label"
      />,
    )
      .find('.visually-hidden')
      .getDOMNode();

    assert.equal(node.textContent, 'progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    mount(
      <ProgressBar min={0} max={10} now={5} label={customLabel} />,
    ).assertSingle('.special-label');
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    mount(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        label={customLabel}
        visuallyHidden
      />,
    ).find('.visually-hidden .special-label');
  });

  it('Should show striped bar', () => {
    mount(<ProgressBar min={1} max={11} now={6} striped />).assertSingle(
      '.progress-bar-striped',
    );
  });

  it('Should show animated striped bar', () => {
    mount(<ProgressBar min={1} max={11} now={6} animated />).assertSingle(
      '.progress-bar-striped.progress-bar-animated',
    );
  });

  it('Should show stacked bars', () => {
    const node = mount(
      <ProgressBar>
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>,
    ).getDOMNode();

    const bar1 = node.firstChild;
    const bar2 = node.lastChild;

    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.equal(bar1.style.width, '50%');

    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.equal(bar2.style.width, '30%');
  });

  it('Should render animated and striped children in stacked bar too', () => {
    const node = mount(
      <ProgressBar>
        <ProgressBar animated key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>,
    ).getDOMNode();
    // const node = ReactDOM.findDOMNode(node);
    const bar1 = node.firstChild;
    const bar2 = node.lastChild;

    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.ok(bar1.className.match(/\bprogress-bar-animated\b/));
    assert.ok(bar1.className.match(/\bprogress-bar-striped\b/));

    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.ok(bar2.className.match(/\bprogress-bar-striped\b/));
    assert.notOk(bar2.className.match(/\bprogress-bar-animated\b/));
  });

  it('Should forward className and style to nested bars', () => {
    const node = mount(
      <ProgressBar>
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>,
    ).getDOMNode();

    const bar1 = node.firstChild;
    const bar2 = node.lastChild;

    assert.ok(bar1.className.match(/\bbar1\b/));
    assert.equal(bar2.style.minWidth, '10px');
  });

  it('allows only ProgressBar in children', () => {
    shouldWarn('Failed prop');

    function NotProgressBar() {
      return null;
    }

    mount(
      <ProgressBar>
        <ProgressBar key={1} />
        <NotProgressBar />
        foo
        <ProgressBar key={2} />
      </ProgressBar>,
    );
  });
});
