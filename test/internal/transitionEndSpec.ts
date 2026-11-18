import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import transitionEnd from '../../src/internal/transitionEnd';

describe('transitionEnd', () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  it.each([
    ['1.4s', 1400],
    ['500ms', 500],
  ])(
    'should parse duration %s from node property',
    (duration, milliseconds) => {
      el.style.transitionDuration = duration;
      const handler = vi.fn();
      const remove = transitionEnd(el, handler);

      vi.advanceTimersByTime(milliseconds + 4);
      expect(handler).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].target).toBe(el);
      remove();
    },
  );

  it('should still emulate the end after a child transition', () => {
    const child = document.createElement('div');
    el.appendChild(child);
    const handler = vi.fn();
    const remove = transitionEnd(el, handler, 100);

    child.dispatchEvent(new Event('transitionend', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].target).toBe(child);

    vi.advanceTimersByTime(105);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler.mock.calls[1][0].target).toBe(el);
    remove();
  });
});
