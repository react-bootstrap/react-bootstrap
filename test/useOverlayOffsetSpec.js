import * as React from 'react';
import { useImperativeHandle } from 'react';
import { mount } from 'enzyme';

import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';
import useOverlayOffset from '../src/useOverlayOffset';

describe('useOverlayOffset', () => {
  const Wrapper = React.forwardRef((props, outerRef) => {
    const [ref, modifiers] = useOverlayOffset();

    useImperativeHandle(outerRef, () => ({
      modifiers,
    }));

    return React.cloneElement(props.children, {
      ref,
    });
  });

  it('should have offset of [0, 8] for Popovers', () => {
    const ref = React.createRef();

    mount(
      <Wrapper ref={ref}>
        <Popover id="test-popover" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 8]);
  });

  it('should have offset of [0, 0] for Tooltips', () => {
    const ref = React.createRef();

    mount(
      <Wrapper ref={ref}>
        <Tooltip id="test-tooltip" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 0]);
  });

  it('should have offset of [0, 0] for any overlay', () => {
    const ref = React.createRef();

    mount(
      <Wrapper ref={ref}>
        <div>test</div>
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 0]);
  });
});
