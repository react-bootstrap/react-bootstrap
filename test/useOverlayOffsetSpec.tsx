import * as React from 'react';
import { useImperativeHandle } from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';
import useOverlayOffset from '../src/useOverlayOffset';
import OverlayTrigger from '../src/OverlayTrigger';
import Button from '../src/Button';
import Overlay from '../src/Overlay';

describe('useOverlayOffset', () => {
  const Wrapper = React.forwardRef<any, React.PropsWithChildren<unknown>>(
    (props, outerRef) => {
      const [ref, modifiers] = useOverlayOffset();

      useImperativeHandle(outerRef, () => ({
        modifiers,
      }));

      return React.cloneElement(props.children as React.ReactElement, {
        ref,
      });
    },
  );

  it('should have offset of [0s, 8] for Popovers', () => {
    const ref = React.createRef<any>();

    render(
      <Wrapper ref={ref}>
        <Popover id="test-popover" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 8]);
  });

  it('should apply offset when rendering Popover inside Overlay', () => {
    const ref = React.createRef<any>();

    render(
      <Overlay show transition={false} ref={ref} target={ref.current}>
        {({ ...props }) => <div {...props}>Simple tooltip</div>}
      </Overlay>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([200, 200]);
  });

  it('should have offset of [0, 0] for Tooltips', () => {
    const ref = React.createRef<any>();

    mount(
      <Wrapper ref={ref}>
        <Tooltip id="test-tooltip" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 0]);
  });

  it('should have offset of [0, 0] for any overlay', () => {
    const ref = React.createRef<any>();

    mount(
      <Wrapper ref={ref}>
        <div>test</div>
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).to.eql([0, 0]);
  });
});
