/**
 * These tests were taken one-for-one from [https://github.com/JedWatson/classnames/blob/master/tests/bind.js]
 * and modified to support the class name mapping and class name converting
 */

import createClassNames from '../src/createClassNames';

const cssModulesMock = {
  a: '#a',
  b: '#b',
  c: '#c',
  d: '#d',
  e: '#e',
  f: '#f',
  gH: '#gH',
  iJKL: '#iJKL',
};

function convertHyphenCaseToCamelCase(value) {
  return value.replace(/-([a-z])/gi, g => g[1].toUpperCase());
}

const classNames = createClassNames(cssModulesMock);
const classNamesWithConverter = createClassNames(
  cssModulesMock,
  convertHyphenCaseToCamelCase,
);

describe('classNames', () => {
  it('keeps object keys with truthy values', () => {
    assert.equal(
      classNames({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      }),
      '#a #f',
    );
  });
  it('keeps class names undefined in bound hash', () => {
    assert.equal(
      classNames({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
        x: true,
        y: null,
        z: 1,
      }),
      '#a #f x z',
    );
  });
  it('joins arrays of class names and ignore falsy values', () => {
    assert.equal(classNames('a', 0, null, undefined, true, 1, 'b'), '#a 1 #b');
  });

  it('supports heterogeneous arguments', () => {
    assert.equal(classNames({ a: true }, 'b', 0), '#a #b');
  });

  it('should be trimmed', () => {
    assert.equal(classNames('', 'b', {}, ''), '#b');
  });

  it('returns an empty string for an empty configuration', () => {
    assert.equal(classNames({}), '');
  });

  it('supports an array of class names', () => {
    assert.equal(classNames(['a', 'b']), '#a #b');
  });

  it('joins array arguments with string arguments', () => {
    assert.equal(classNames(['a', 'b'], 'c'), '#a #b #c');
    assert.equal(classNames('c', ['a', 'b']), '#c #a #b');
  });

  it('handles multiple array arguments', () => {
    assert.equal(classNames(['a', 'b'], ['c', 'd']), '#a #b #c #d');
  });

  it('handles arrays that include falsy and true values', () => {
    assert.equal(
      classNames(['a', 0, null, undefined, false, true, 'b']),
      '#a #b',
    );
  });

  it('handles arrays that include arrays', () => {
    assert.equal(classNames(['a', ['b', 'c']]), '#a #b #c');
  });

  it('handles arrays that include objects', () => {
    assert.equal(classNames(['a', { b: true, c: false }]), '#a #b');
  });

  it('handles deep array recursion', () => {
    assert.equal(classNames(['a', ['b', ['c', { d: true }]]]), '#a #b #c #d');
  });
});

describe('classNamesWithConverter', () => {
  it('keeps object keys with truthy values', () => {
    assert.equal(
      classNamesWithConverter({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      }),
      '#a #f',
    );
  });
  it('keeps class names undefined in bound hash', () => {
    assert.equal(
      classNamesWithConverter({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
        x: true,
        y: null,
        z: 1,
      }),
      '#a #f x z',
    );
  });
  it('joins arrays of class names and ignore falsy values', () => {
    assert.equal(
      classNamesWithConverter('a', 0, null, undefined, true, 1, 'b'),
      '#a 1 #b',
    );
  });

  it('supports heterogeneous arguments', () => {
    assert.equal(classNamesWithConverter({ a: true }, 'b', 0), '#a #b');
  });

  it('should be trimmed', () => {
    assert.equal(classNamesWithConverter('', 'b', {}, ''), '#b');
  });

  it('returns an empty string for an empty configuration', () => {
    assert.equal(classNamesWithConverter({}), '');
  });

  it('supports an array of class names', () => {
    assert.equal(classNamesWithConverter(['a', 'b']), '#a #b');
  });

  it('joins array arguments with string arguments', () => {
    assert.equal(classNamesWithConverter(['a', 'b'], 'c'), '#a #b #c');
    assert.equal(classNamesWithConverter('c', ['a', 'b']), '#c #a #b');
  });

  it('handles multiple array arguments', () => {
    assert.equal(
      classNamesWithConverter(['a', 'b'], ['c', 'd']),
      '#a #b #c #d',
    );
  });

  it('handles arrays that include falsy and true values', () => {
    assert.equal(
      classNamesWithConverter(['a', 0, null, undefined, false, true, 'b']),
      '#a #b',
    );
  });

  it('handles arrays that include arrays', () => {
    assert.equal(classNamesWithConverter(['a', ['b', 'c']]), '#a #b #c');
  });

  it('handles arrays that include objects', () => {
    assert.equal(
      classNamesWithConverter(['a', { b: true, c: false }]),
      '#a #b',
    );
  });

  it('handles deep array recursion', () => {
    assert.equal(
      classNamesWithConverter(['a', ['b', ['c', { d: true }]]]),
      '#a #b #c #d',
    );
  });

  it('converts class references from hyphen case to pascal case', () => {
    assert.equal(classNamesWithConverter(['g-h', 'i-J-k-L']), '#gH #iJKL');
  });
});
