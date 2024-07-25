/* eslint-disable no-new-func */
import { describe, expect, it, vi } from 'vitest';
import createChainedFunction from '../src/createChainedFunction';

describe('createChainedFunction', () => {
  it('returns null with no arguments', () => {
    expect(createChainedFunction()).toEqual(null);
  });

  it('returns original function when single function is provided', () => {
    const func1 = vi.fn();
    expect(createChainedFunction(func1)).toEqual(func1);
  });

  it('wraps two functions with another that invokes both when called', () => {
    const func1 = vi.fn();
    const func2 = vi.fn();
    const chained = createChainedFunction(func1, func2);

    expect(chained).not.toEqual(func1);
    expect(chained).not.toEqual(func2);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();

    chained();

    expect(func1).toHaveBeenCalledOnce();
    expect(func2).toHaveBeenCalledOnce();
  });

  it('wraps multiple functions and invokes them in the order provided', () => {
    const results: number[] = [];
    const func1 = () => results.push(1);
    const func2 = () => results.push(2);
    const func3 = () => results.push(3);
    const chained = createChainedFunction(func1, func2, func3);
    chained();
    expect(results).toEqual([1, 2, 3]);
  });

  it('forwards arguments to all chained functions', () => {
    const in1 = 'herpa derpa';
    const in2 = {
      herpa: 'derpa',
    };

    const func = (arg1: any, arg2: any) => {
      expect(arg1).toEqual(in1);
      expect(arg2).toEqual(in2);
    };

    const chained = createChainedFunction(func, func, func);
    chained(in1, in2);
  });

  it('throws when func is not provided', () => {
    expect(() => {
      createChainedFunction({ herpa: 'derpa' });
    }).toThrow(/Invalid Argument Type/);
  });

  it('works with new Function call', () => {
    const results = [];
    const func1 = new Function('results', 'results.push(1);');
    const func2 = new Function('results', 'results.push(2);');
    const chained = createChainedFunction(func1, func2);
    chained(results);
    expect(results).toEqual([1, 2]);
  });
});
