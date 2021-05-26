import { mount } from 'enzyme';

import Ratio from '../src/Ratio';

describe('Ratio', () => {
  it('should contain `ratio` class', () => {
    mount(
      <Ratio aspectRatio="1x1" className="custom-class">
        <div />
      </Ratio>,
    ).assertSingle('div.custom-class.ratio.ratio-1x1 div');
  });

  it('should support custom ratios using percent for aspectRatio', () => {
    const wrapper = mount(
      <Ratio aspectRatio={50}>
        <div />
      </Ratio>,
    );

    expect(wrapper.find('.ratio').props().style['--bs-aspect-ratio']).to.equal(
      '50%',
    );
  });

  it('should support custom ratios using fraction for aspectRatio', () => {
    const wrapper = mount(
      <Ratio aspectRatio={1 / 2}>
        <div />
      </Ratio>,
    );

    expect(wrapper.find('.ratio').props().style['--bs-aspect-ratio']).to.equal(
      '50%',
    );
  });

  it('should support use 100% as custom ratio if aspectRatio is less than 0', () => {
    const wrapper = mount(
      <Ratio aspectRatio={-1}>
        <div />
      </Ratio>,
    );

    expect(wrapper.find('.ratio').props().style['--bs-aspect-ratio']).to.equal(
      '100%',
    );
  });

  it('should support use 100% as custom ratio if aspectRatio is greater than 100', () => {
    const wrapper = mount(
      <Ratio aspectRatio={200}>
        <div />
      </Ratio>,
    );

    expect(wrapper.find('.ratio').props().style['--bs-aspect-ratio']).to.equal(
      '100%',
    );
  });
});
