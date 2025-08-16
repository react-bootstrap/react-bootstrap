import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as React from 'react';
import { render } from '@testing-library/react';
import { injectCss } from './helpers';
import Fade from '../src/Fade';
import { parseDuration } from '../src/transitionEndListener';

describe('transitionEndListener', () => {
  beforeEach(() => {
    injectCss(`
      .test-transition {
        transition-duration: 0.15s;
        transition-delay: 1s;
      }
    `);
  });

  afterEach(() => {
    injectCss.reset();
  });

  it('should render the Fade component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Fade in>
        <div ref={ref} className="test-transition">
          test
        </div>
      </Fade>,
    );
    expect(ref.current).toBeDefined();
    expect(parseDuration(ref.current!, 'transition-duration')).toEqual(150);
    expect(parseDuration(ref.current!, 'transition-delay')).toEqual(1000);
  });
});
